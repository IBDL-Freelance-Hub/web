"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  options: (string | SelectOption)[];
  placeholder: string;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  hasError,
  ariaDescribedBy,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = id ? `${id}-listbox` : "custom-select-listbox";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(
    (opt) => opt.value === value || opt.label === value
  );
  const displayLabel = selectedOption
    ? selectedOption.label
    : value || placeholder;

  return (
    <div ref={dropdownRef} id={id} className="relative w-full">
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        id={id ? `${id}-button` : undefined}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm text-[#16162c] transition-all outline-none",
          hasError
            ? "border-[#e11119] ring-2 ring-red-500/20"
            : isOpen
              ? "border-[#419257] ring-4 ring-[#419257]/15"
              : "border-[#e2e2ec] hover:border-[#6a6a86]"
        )}
      >
        <span className={cn(!selectedOption && !value && "text-[#6a6a86]/70")}>
          {displayLabel}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#6a6a86] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="animate-in fade-in zoom-in-95 absolute start-0 end-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-[#e2e2ec] bg-white p-1.5 shadow-xl duration-150"
        >
          <button
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-start text-xs font-semibold text-[#6a6a86] hover:bg-[#f6f6fa]"
          >
            {placeholder}
          </button>
          {normalizedOptions.map((opt) => {
            const isSelected = value === opt.value || value === opt.label;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-sm transition-colors",
                  isSelected
                    ? "bg-[#419257]/10 font-bold text-[#419257]"
                    : "text-[#16162c] hover:bg-[#f6f6fa]"
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 text-[#419257]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
