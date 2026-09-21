import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "@/lib/session";

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

    const backendUrl = `${API_BASE_URL}/files/${encodeURIComponent(fileId)}/download`;

    const backendRes = await fetch(backendUrl, {
      method: "GET",
      headers,
      redirect: "follow",
    });

    if (!backendRes.ok) {
      return new NextResponse(
        `File not found or access denied: ${backendRes.statusText}`,
        { status: backendRes.status }
      );
    }

    const contentType =
      backendRes.headers.get("content-type") || "application/octet-stream";

    // If backend returns a JSON payload containing a direct download/signed URL
    if (contentType.includes("application/json")) {
      const data = await backendRes.json();
      if (data?.data?.downloadUrl) {
        // Stream the image from the signed URL directly
        const signedRes = await fetch(data.data.downloadUrl);
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
                ? { "Content-Length": signedRes.headers.get("content-length")! }
                : {}),
            },
          });
        }
        return NextResponse.redirect(data.data.downloadUrl);
      }
      return new NextResponse("File not found", { status: 404 });
    }

    // Stream the binary image response directly
    return new Response(backendRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        ...(backendRes.headers.get("content-length")
          ? { "Content-Length": backendRes.headers.get("content-length")! }
          : {}),
      },
    });
  } catch (error: unknown) {
    console.error("Error in /api/v1/files/[fileId]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
