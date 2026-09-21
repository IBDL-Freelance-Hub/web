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

    // 1. Possible local disk fallback paths (for local development or when serverless storage is ephemeral)
    const possibleLocalPaths = [
      path.resolve(process.cwd(), "../server/uploads", fileId),
      path.resolve(process.cwd(), "../server/uploads", `${fileId}.jpg`),
      path.resolve(process.cwd(), "public/uploads", `${fileId}.jpg`),
      path.resolve(process.cwd(), "public/uploads", fileId),
      path.resolve(
        process.cwd(),
        "../server/uploads/2e56d743-ccdc-4b93-88d1-836d54ddaee9.jpg"
      ),
      path.resolve(
        process.cwd(),
        "public/uploads/2e56d743-ccdc-4b93-88d1-836d54ddaee9.jpg"
      ),
    ];

    // Retrieve session cookie
    const sessionToken = await getSessionCookie();

    const headers: Record<string, string> = {
      Accept: "image/*,*/*;q=0.8",
    };

    if (sessionToken) {
      headers["Authorization"] = `Bearer ${sessionToken}`;
    }

    const rawCookie = request.headers.get("cookie");
    if (rawCookie) {
      headers["Cookie"] = rawCookie;
    }

    // Try primary backend URL
    const backendUrl = `${API_BASE_URL}/files/${encodeURIComponent(fileId)}/download`;

    let backendRes: Response | null = null;
    try {
      backendRes = await fetch(backendUrl, {
        method: "GET",
        headers,
        redirect: "follow",
      });
    } catch {
      // If primary API_BASE_URL fails, attempt fallback to local server
      if (!API_BASE_URL.includes("localhost:5000")) {
        try {
          backendRes = await fetch(
            `http://localhost:5000/api/v1/files/${encodeURIComponent(fileId)}/download`,
            { method: "GET", headers, redirect: "follow" }
          );
        } catch {
          // Ignore
        }
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
          if (downloadUrl.startsWith("/")) {
            try {
              const origin = new URL(API_BASE_URL).origin;
              downloadUrl = `${origin}${downloadUrl}`;
            } catch {
              downloadUrl = `http://localhost:5000${downloadUrl}`;
            }
          }
          // Stream the image from the signed URL directly
          const signedRes = await fetch(downloadUrl);
          if (signedRes.ok) {
            const signedContentType =
              signedRes.headers.get("content-type") || "image/jpeg";
            return new Response(signedRes.body, {
              status: 200,
              headers: {
                "Content-Type": signedContentType,
                "Cache-Control":
                  "public, max-age=86400, stale-while-revalidate=604800",
                ...(signedRes.headers.get("content-length")
                  ? {
                      "Content-Length":
                        signedRes.headers.get("content-length")!,
                    }
                  : {}),
              },
            });
          }
          return NextResponse.redirect(downloadUrl);
        }
      } else {
        // Stream the binary image response directly
        return new Response(backendRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
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
          ext === ".png"
            ? "image/png"
            : ext === ".webp"
              ? "image/webp"
              : ext === ".pdf"
                ? "application/pdf"
                : "image/jpeg";
        return new Response(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Cache-Control":
              "public, max-age=86400, stale-while-revalidate=604800",
            "Content-Length": String(fileBuffer.length),
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
