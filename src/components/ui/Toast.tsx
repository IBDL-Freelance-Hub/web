"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";
export type ToastScope = "hub" | "public" | "console";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (
    type: ToastType,
    title: string,
    message?: string,
    scope?: ToastScope
  ) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const SCOPE_DURATIONS: Record<ToastScope, number> = {
  hub: 3600, // 3.6s for Hub trainer workspace
  public: 3800, // 3.8s for public screens
  console: 3200, // 3.2s for operations console
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      scope: ToastScope = "hub"
    ) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, type, title, message };
      setToasts((prev) => [...prev, newToast]);

      const duration = SCOPE_DURATIONS[scope];
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed end-5 bottom-5 z-50 flex w-full max-w-sm flex-col gap-2 px-4">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastMessage;
  onClose: () => void;
}) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 className="text-status-ok h-5 w-5 shrink-0" />,
    error: <AlertCircle className="text-status-stop h-5 w-5 shrink-0" />,
    info: <Info className="h-5 w-5 shrink-0 text-blue-400" />,
  };

  const borders: Record<ToastType, string> = {
    success: "border-emerald-800/80 bg-slate-900/95 text-emerald-100",
    error: "border-rose-800/80 bg-slate-900/95 text-rose-100",
    info: "border-blue-800/80 bg-slate-900/95 text-blue-100",
  };

  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-3 pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur transition-all duration-300",
        borders[toast.type]
      )}
      role="alert"
    >
      {icons[toast.type]}
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        {toast.message && (
          <p className="text-xs leading-normal text-slate-400">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="rounded-md p-0.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function useOptionalToast() {
  return useContext(ToastContext);
}
