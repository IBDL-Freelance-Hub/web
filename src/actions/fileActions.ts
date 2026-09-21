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
 * Dispatches GET /api/v1/files/${fileId}/download to obtain a secure download or signed URL.
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

    const res = await api.get<{
      success: boolean;
      data: {
        downloadUrl: string;
        file?: Record<string, unknown>;
      };
    }>(`/files/${encodeURIComponent(fileId)}/download?redirect=false`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res?.success || !res?.data?.downloadUrl) {
      return {
        success: false,
        error: "Could not generate file download URL.",
      };
    }

    return {
      success: true,
      downloadUrl: res.data.downloadUrl,
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
