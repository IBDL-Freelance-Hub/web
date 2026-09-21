import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ storageKey: string }> }
) {
  try {
    const { storageKey } = await context.params;
    if (!storageKey) {
      return new NextResponse("Storage key is required", { status: 400 });
    }

    const decodedKey = decodeURIComponent(storageKey);

    // 1. Check local file system (server/uploads or public/uploads)
    const localPaths = [
      path.resolve(process.cwd(), "../server/uploads", decodedKey),
      path.resolve(process.cwd(), "public/uploads", decodedKey),
    ];

    for (const p of localPaths) {
      if (fs.existsSync(p)) {
        const fileBuffer = fs.readFileSync(p);
        const ext = path.extname(p).toLowerCase();
        const mimeType =
          ext === ".pdf"
            ? "application/pdf"
            : ext === ".png"
              ? "image/png"
              : ext === ".webp"
                ? "image/webp"
                : ext === ".jpg" || ext === ".jpeg"
                  ? "image/jpeg"
                  : "application/octet-stream";

        return new Response(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Content-Disposition": `attachment; filename="${decodedKey}"`,
            "Cache-Control": "private, max-age=3600",
            "Content-Length": String(fileBuffer.length),
          },
        });
      }
    }

    // 2. Proxy request to local express server
    const queryString = request.nextUrl.search;
    const localServerUrl = `http://localhost:5000/api/v1/files/raw/${encodeURIComponent(decodedKey)}${queryString}`;

    try {
      const upstreamRes = await fetch(localServerUrl);
      if (upstreamRes.ok) {
        const contentType =
          upstreamRes.headers.get("content-type") || "application/octet-stream";
        return new Response(upstreamRes.body, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${decodedKey}"`,
            ...(upstreamRes.headers.get("content-length")
              ? { "Content-Length": upstreamRes.headers.get("content-length")! }
              : {}),
          },
        });
      }
    } catch {
      // Ignore proxy error
    }

    return new NextResponse("File not found", { status: 404 });
  } catch (error: unknown) {
    console.error("Error in /api/v1/files/raw/[storageKey]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
