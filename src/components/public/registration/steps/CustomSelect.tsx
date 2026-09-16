"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  hasError?: boolean;
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  hasError,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={dropdownRef} id={id} className="relative w-full">
      <button
        type="button"
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
        <span className={cn(!value && "text-[#6a6a86]/70")}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#6a6a86] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute start-0 end-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-[#e2e2ec] bg-white p-1.5 shadow-xl duration-150">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-start text-xs font-semibold text-[#6a6a86] hover:bg-[#f6f6fa]"
          >
            {placeholder}
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-start text-sm transition-colors",
                value === opt
                  ? "bg-[#419257]/10 font-bold text-[#419257]"
                  : "text-[#16162c] hover:bg-[#f6f6fa]"
              )}
            >
              <span>{opt}</span>
              {value === opt && <Check className="h-4 w-4 text-[#419257]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
