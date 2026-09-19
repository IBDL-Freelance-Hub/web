import "server-only";
import { headers } from "next/headers";
import { getSessionCookie } from "./session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

async function getClientIpHeader(): Promise<string> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    if (forwardedFor && forwardedFor.trim().length > 0) {
      return forwardedFor.split(",")[0].trim();
    }
    const realIp = requestHeaders.get("x-real-ip");
    if (realIp && realIp.trim().length > 0) {
      return realIp.trim();
    }
  } catch {
    // Fallback when executed outside request context
  }
  return "127.0.0.1";
}

export interface FetchOptions {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

export class ApiClient {
  private async buildHeaders(
    customHeaders?: Record<string, string>
  ): Promise<Record<string, string>> {
    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // Attach client IP forwarding header (FIX 2)
    const clientIp = await getClientIpHeader();
    reqHeaders["x-real-client-ip"] = clientIp;

    // Attach Session token if present
    const sessionToken = await getSessionCookie();
    if (sessionToken && !reqHeaders["Authorization"]) {
      reqHeaders["Authorization"] = `Bearer ${sessionToken}`;
    }

    return reqHeaders;
  }

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, headers: customHeaders, method = "GET", body } = options;

    let url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const requestHeaders = await this.buildHeaders(customHeaders);

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: requestHeaders,
        body,
      });
    } catch (networkError: unknown) {
      const err = networkError as Error & { code?: string };
      const connectionError = new Error(
        "Unable to connect to the server. Please check your network connection or try again later."
      ) as Error & {
        status: number;
        code?: string;
      };
      connectionError.status = 503;
      connectionError.code = err?.code || "NETWORK_ERROR";
      throw connectionError;
    }

    const rawText = await response.text();
    let data: {
      message?: string;
      error?: string;
      title?: string;
      code?: string;
      fieldErrors?: Record<string, string[]>;
    } | null = null;

    if (rawText && rawText.trim().length > 0) {
      try {
        data = JSON.parse(rawText);
      } catch {
        // Non-JSON response (e.g. HTML error page or plain text from Vercel / reverse proxy)
        data = null;
      }
    }

    if (!response.ok) {
      const rawError = data?.message || data?.error;
      const errorMessage =
        typeof rawError === "string"
          ? rawError
          : typeof (rawError as unknown as { message?: string })?.message ===
              "string"
            ? (rawError as unknown as { message: string }).message
            : response.status >= 500
              ? "The server encountered an error and could not complete your request. Please try again later."
              : `HTTP ${response.status} error`;
      const error = new Error(errorMessage) as Error & {
        status: number;
        title?: string;
        code?: string;
        fieldErrors?: Record<string, string[]>;
      };
      error.status = response.status;
      error.title = data?.title;
      error.code = data?.code;
      error.fieldErrors = data?.fieldErrors;
      throw error;
    }

    if (data === null && rawText.trim().length > 0) {
      throw new Error("Invalid response received from server.");
    }

    return (data ?? {}) as T;
  }

  get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient();
