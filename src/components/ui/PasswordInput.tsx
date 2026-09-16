"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./Input";

export interface PasswordInputProps extends Omit<
  InputProps,
  "type" | "endIcon"
> {
  toggleLabelShow?: string;
  toggleLabelHide?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      toggleLabelShow = "Show password",
      toggleLabelHide = "Hide password",
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleButton = (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? toggleLabelHide : toggleLabelShow}
        aria-pressed={showPassword}
        className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors duration-150 ease-out hover:bg-slate-100 hover:text-slate-700 focus:ring-2 focus:ring-slate-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    );

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        endIcon={toggleButton}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
