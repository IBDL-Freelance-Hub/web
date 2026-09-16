import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "./RequiredIndicator";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string | null;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId =
      id ||
      (typeof label === "string"
        ? label.toLowerCase().replace(/[*]+/g, "").trim().replace(/\s+/g, "-")
        : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const helperId = helperText && inputId ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold tracking-wider text-[#16162c] uppercase"
          >
            {typeof label === "string" ? (
              label.includes("*") ? (
                <>
                  {label.split("*").map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part.trimEnd()}
                      {index < array.length - 1 && <RequiredIndicator />}
                    </React.Fragment>
                  ))}
                </>
              ) : required ? (
                <>
                  {label}
                  <RequiredIndicator />
                </>
              ) : (
                label
              )
            ) : (
              label
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-slate-400">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId || helperId}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all duration-200 ease-out outline-none placeholder:text-[#6a6a86]/50",
              startIcon && "ps-11",
              endIcon && "pe-11",
              error
                ? "animate-shake border-[#e11119] bg-red-50/10 focus:border-[#e11119] focus:ring-4 focus:ring-[#e11119]/15 motion-reduce:animate-none"
                : "border-[#e2e2ec] focus:border-[#419257] focus:ring-4 focus:ring-[#419257]/15",
              disabled && "cursor-not-allowed bg-slate-100/70 opacity-60",
              className
            )}
            {...props}
          />

          {endIcon && (
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
              {endIcon}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} className="text-xs font-medium text-[#e11119]">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-[#6a6a86]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
