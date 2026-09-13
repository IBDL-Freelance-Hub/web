import "server-only";
import { headers } from "next/headers";
import { getSessionCookie } from "./session";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000/api/v1";

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

    const response = await (
      globalThis as unknown as {
        fetch: (
          url: string,
          init?: unknown
        ) => Promise<{
          ok: boolean;
          status: number;
          json: () => Promise<unknown>;
        }>;
      }
    ).fetch(url, {
      method,
      headers: requestHeaders,
      body,
    });

    const data = (await response.json()) as {
      message?: string;
      error?: string;
      fieldErrors?: Record<string, string[]>;
    };

    if (!response.ok) {
      const rawError = data?.message || data?.error;
      const errorMessage =
        typeof rawError === "string"
          ? rawError
          : typeof (rawError as unknown as { message?: string })?.message ===
              "string"
            ? (rawError as unknown as { message: string }).message
            : `HTTP ${response.status} error`;
      const error = new Error(errorMessage) as Error & {
        status: number;
        fieldErrors?: Record<string, string[]>;
      };
      error.status = response.status;
      error.fieldErrors = data?.fieldErrors;
      throw error;
    }

    return data as T;
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
