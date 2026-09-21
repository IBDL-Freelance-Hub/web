"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";
import {
  validateProfilePhotoFile,
  validateCvFile,
} from "@/lib/validations/files";
import type { ActionResponse } from "@/types/api";

export interface ProfilePhotoUploadData {
  fileId: string;
  photoUrl: string;
}

export interface CvUploadData {
  fileId: string;
  originalName: string;
  createdAt: string;
  profileCompletionRate?: number;
}

export type FileDownloadResponse =
  | { success: true; downloadUrl: string }
  | { success: false; error: string; status?: number };

/**
 * Uploads a member profile photo (JPEG, PNG, WebP up to 5MB).
 * Dispatches POST /api/v1/files/photo with multipart headers.
 */
export async function uploadProfilePhotoAction(
  formData: FormData
): Promise<ActionResponse<ProfilePhotoUploadData>> {
  try {
    const file = formData.get("file") as File | null;

    const validation = validateProfilePhotoFile(file);
    if (!validation.valid || !file) {
      return {
        success: false,
        error: validation.error || "Please select an image file to upload.",
      };
    }

    const payload = new FormData();
    payload.append("file", file, file.name);

    const res = await api.postFormData<{
      success: boolean;
      data: {
        file?: {
          id: string;
          category?: string;
          originalName?: string;
          createdAt?: string;
        };
        photoFileId?: string;
      };
    }>("/files/photo", payload);

    const fileId = res?.data?.photoFileId || res?.data?.file?.id;
    if (!res?.success || !fileId) {
      return {
        success: false,
        error: "Failed to upload profile photo.",
      };
    }

    // Persist file buffer to local disk to prevent disappearing on hard reload when backend is ephemeral/serverless
    try {
      const fs = await import("fs");
      const path = await import("path");
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadsDir = path.resolve(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, fileId), buffer);
      fs.writeFileSync(path.join(uploadsDir, `${fileId}.jpg`), buffer);
      fs.writeFileSync(path.join(uploadsDir, "avatar-latest.jpg"), buffer);

      const serverUploadsDir = path.resolve(process.cwd(), "../server/uploads");
      if (fs.existsSync(serverUploadsDir)) {
        fs.writeFileSync(path.join(serverUploadsDir, fileId), buffer);
        fs.writeFileSync(path.join(serverUploadsDir, `${fileId}.jpg`), buffer);
      }
    } catch {
      // Non-blocking local persistence
    }

    revalidatePath("/profile");
    revalidatePath("/overview");

    return {
      success: true,
      data: {
        fileId,
        photoUrl: `/api/v1/files/${fileId}`,
      },
    };
  } catch (error: unknown) {
    const err = error as Error & { status?: number };
    return {
      success: false,
      error:
        err?.message ||
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Uploads a member CV document (PDF, DOC, DOCX up to 10MB client bound, 25MB server ceiling).
 * Dispatches POST /api/v1/files/cv with multipart headers.
 */
export async function uploadCvAction(
  formData: FormData
): Promise<ActionResponse<CvUploadData>> {
  try {
    const file = formData.get("file") as File | null;

    const validation = validateCvFile(file);
    if (!validation.valid || !file) {
      return {
        success: false,
        error: validation.error || "Please select a CV document to upload.",
      };
    }

    const payload = new FormData();
    payload.append("file", file, file.name);

    const res = await api.postFormData<{
      success: boolean;
      data: {
        file: {
          id: string;
          category: string;
          originalName: string;
          createdAt: string;
          sizeBytes?: number;
          mimeType?: string;
        };
        profileCompletionRate?: number;
        completionPercentage?: number;
      };
    }>("/files/cv", payload);

    if (!res?.success || !res?.data?.file) {
      return {
        success: false,
        error: "Failed to upload CV document.",
      };
    }

    // Persist file buffer to local disk to prevent disappearing on hard reload when backend is ephemeral/serverless
    try {
      const fs = await import("fs");
      const path = await import("path");
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadsDir = path.resolve(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, res.data.file.id), buffer);
      fs.writeFileSync(
        path.join(uploadsDir, `${res.data.file.id}.pdf`),
        buffer
      );
    } catch {
      // Non-blocking local persistence
    }

    revalidatePath("/profile");
    revalidatePath("/overview");

    return {
      success: true,
      data: {
        fileId: res.data.file.id,
        originalName: res.data.file.originalName,
        createdAt: res.data.file.createdAt,
        profileCompletionRate:
          res.data.profileCompletionRate ?? res.data.completionPercentage,
      },
    };
  } catch (error: unknown) {
    const err = error as Error & { status?: number };
    return {
      success: false,
      error:
        err?.message ||
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Dispatches file download.
 * Returns a direct proxy URL pointing to /api/v1/files/${fileId}?download=true
 * which ensures reliable, authenticated streaming of documents and fallback.
 */
export async function getFileDownloadUrlAction(
  fileId: string
): Promise<FileDownloadResponse> {
  try {
    if (!fileId || typeof fileId !== "string") {
      return {
        success: false,
        error: "File ID is required.",
      };
    }

    return {
      success: true,
      downloadUrl: `/api/v1/files/${encodeURIComponent(fileId)}?download=true`,
    };
  } catch (error: unknown) {
    const err = error as Error & { status?: number };
    return {
      success: false,
      error:
        err?.message ||
        "Unable to download the requested file. Please try again later.",
      status: err?.status,
    };
  }
}

/**
 * Deletes/removes member profile photo.
 * Dispatches DELETE /api/v1/files/photo.
 */
export async function deleteProfilePhotoAction(): Promise<
  ActionResponse<{ message: string }>
> {
  try {
    let res: { success?: boolean; message?: string } | null = null;
    try {
      res = await api.delete<{ success: boolean; message: string }>(
        "/files/photo"
      );
    } catch {
      // If remote Vercel fails or doesn't have the new endpoint yet, fallback to local Express server
      const localBase = "http://localhost:5000/api/v1";
      const sessionToken = await (
        await import("@/lib/session")
      ).getSessionCookie();
      const fallbackRes = await fetch(`${localBase}/files/photo`, {
        method: "DELETE",
        headers: {
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
      });
      if (fallbackRes.ok) {
        res = await fallbackRes.json();
      }
    }

    if (!res?.success) {
      return {
        success: false,
        error: res?.message || "Failed to remove profile photo.",
      };
    }

    revalidatePath("/profile");
    revalidatePath("/overview");

    return {
      success: true,
      data: { message: res.message || "Profile photo removed successfully." },
    };
  } catch (error: unknown) {
    const err = error as Error & { status?: number };
    return {
      success: false,
      error:
        err?.message ||
        "The server is temporarily unavailable. Please try again later.",
      status: err?.status,
    };
  }
}
