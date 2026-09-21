import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "@/lib/session";
import fs from "fs";
import path from "path";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await context.params;
    if (!fileId) {
      return new NextResponse("File ID is required", { status: 400 });
    }

    const isDownload = request.nextUrl.searchParams.get("download") === "true";

    // Known file mappings for local development & fallback
    const knownFileMappings: Record<
      string,
      { storageKey: string; filename: string; mimeType: string }
    > = {
      "2a7933d6-70f1-4787-942c-ea0d7c1d1ee8": {
        storageKey: "8ffeaf31-cfbb-4e4a-aee2-5931110fdaee.pdf",
        filename: "Marwa_Ashraf_Abdullah_Full-Stack.pdf",
        mimeType: "application/pdf",
      },
      "0199359c-36a6-40ad-beea-2ed6863cad33": {
        storageKey: "2e56d743-ccdc-4b93-88d1-836d54ddaee9.jpg",
        filename: "MarwaAshrafAbdullah.jpeg",
        mimeType: "image/jpeg",
      },
    };

    // 1. Possible local disk fallback paths (for local development or when serverless storage is ephemeral)
    const specificMapping = knownFileMappings[fileId];
    const possibleLocalPaths = [
      ...(specificMapping
        ? [
            path.resolve(
              process.cwd(),
              "../server/uploads",
              specificMapping.storageKey
            ),
            path.resolve(
              process.cwd(),
              "public/uploads",
              specificMapping.storageKey
            ),
          ]
        : []),
      path.resolve(process.cwd(), "../server/uploads", fileId),
      path.resolve(process.cwd(), "../server/uploads", `${fileId}.pdf`),
      path.resolve(process.cwd(), "../server/uploads", `${fileId}.jpg`),
      path.resolve(process.cwd(), "public/uploads", fileId),
      path.resolve(process.cwd(), "public/uploads", `${fileId}.pdf`),
      path.resolve(process.cwd(), "public/uploads", `${fileId}.jpg`),
    ];

    // Retrieve session cookie
    const sessionToken = await getSessionCookie();

    const headers: Record<string, string> = {
      Accept: isDownload ? "*/*" : "image/*,*/*;q=0.8",
    };

    if (sessionToken) {
      headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const rawCookie = request.headers.get("cookie");
    if (rawCookie) {
      headers["Cookie"] = rawCookie;
    }

    // Try primary backend URL
    const backendUrl = `${API_BASE_URL}/files/${encodeURIComponent(fileId)}/download?redirect=false`;

    let backendRes: Response | null = null;
    try {
      backendRes = await fetch(backendUrl, {
        method: "GET",
        headers,
        redirect: "follow",
      });
    } catch {
      // Ignore network error and proceed to local fallback
    }

    // If primary backend failed or returned not OK, try local Express server
    if (
      (!backendRes || !backendRes.ok) &&
      !API_BASE_URL.includes("localhost:5000")
    ) {
      try {
        backendRes = await fetch(
          `http://localhost:5000/api/v1/files/${encodeURIComponent(fileId)}/download?redirect=false`,
          { method: "GET", headers, redirect: "follow" }
        );
      } catch {
        // Ignore
      }
    }

    if (backendRes && backendRes.ok) {
      const contentType =
        backendRes.headers.get("content-type") || "application/octet-stream";

      // If backend returns a JSON payload containing a direct download/signed URL
      if (contentType.includes("application/json")) {
        const data = await backendRes.json();
        if (data?.data?.downloadUrl) {
          let downloadUrl = data.data.downloadUrl as string;
          const originalFilename =
            data?.data?.file?.originalName ||
            specificMapping?.filename ||
            "download";

          if (downloadUrl.startsWith("/")) {
            try {
              const origin = new URL(API_BASE_URL).origin;
              downloadUrl = `${origin}${downloadUrl}`;
            } catch {
              downloadUrl = `http://localhost:5000${downloadUrl}`;
            }
          }

          // Try streaming from the signed URL
          try {
            let signedRes = await fetch(downloadUrl);
            if (!signedRes.ok && downloadUrl.includes("vercel.app")) {
              // Try local server signed URL
              const localSignedUrl = downloadUrl.replace(
                new URL(downloadUrl).origin,
                "http://localhost:5000"
              );
              const localRes = await fetch(localSignedUrl);
              if (localRes.ok) {
                signedRes = localRes;
              }
            }

            if (signedRes.ok) {
              const signedContentType =
                data?.data?.file?.mimeType ||
                signedRes.headers.get("content-type") ||
                specificMapping?.mimeType ||
                "application/octet-stream";

              const responseHeaders: Record<string, string> = {
                "Content-Type": signedContentType,
                "Cache-Control":
                  "public, max-age=86400, stale-while-revalidate=604800",
                ...(isDownload || signedContentType === "application/pdf"
                  ? {
                      "Content-Disposition": `attachment; filename="${encodeURIComponent(originalFilename)}"`,
                    }
                  : {}),
                ...(signedRes.headers.get("content-length")
                  ? {
                      "Content-Length":
                        signedRes.headers.get("content-length")!,
                    }
                  : {}),
              };

              return new Response(signedRes.body, {
                status: 200,
                headers: responseHeaders,
              });
            }
          } catch {
            // Ignore signed URL fetch error and try local files
          }
        }
      } else {
        // Stream the binary response directly
        const originalFilename = specificMapping?.filename || "download";

        return new Response(backendRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            ...(isDownload || contentType === "application/pdf"
              ? {
                  "Content-Disposition": `attachment; filename="${encodeURIComponent(originalFilename)}"`,
                }
              : {}),
            ...(backendRes.headers.get("content-length")
              ? { "Content-Length": backendRes.headers.get("content-length")! }
              : {}),
          },
        });
      }
    }

    // 2. If backend response failed (e.g. 404 from ephemeral serverless), check local file system
    for (const p of possibleLocalPaths) {
      if (fs.existsSync(p)) {
        const fileBuffer = fs.readFileSync(p);
        const ext = path.extname(p).toLowerCase();
        const mimeType =
          specificMapping?.mimeType ||
          (ext === ".pdf"
            ? "application/pdf"
            : ext === ".png"
              ? "image/png"
              : ext === ".webp"
                ? "image/webp"
                : ext === ".jpg" || ext === ".jpeg"
                  ? "image/jpeg"
                  : "application/octet-stream");

        const filename = specificMapping?.filename || path.basename(p);

        return new Response(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            "Content-Length": String(fileBuffer.length),
            ...(isDownload || mimeType === "application/pdf"
              ? {
                  "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
                }
              : {}),
          },
        });
      }
    }

    return new NextResponse("File not found", { status: 404 });
  } catch (error: unknown) {
    console.error("Error in /api/v1/files/[fileId]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
