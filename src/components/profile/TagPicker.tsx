"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

export interface TagPickerProps {
  label: string;
  field: "areasOfExpertise" | "industriesServed" | "languages";
  items: string[];
  presets: readonly string[];
  onAdd: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    item: string
  ) => void;
  onRemove: (
    field: "areasOfExpertise" | "industriesServed" | "languages",
    item: string
  ) => void;
  isAr: boolean;
  placeholder?: string;
}

export function TagPicker({
  label,
  field,
  items,
  presets,
  onAdd,
  onRemove,
  isAr,
  placeholder,
}: TagPickerProps) {
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !items.includes(trimmed)) {
      onAdd(field, trimmed);
      setCustomInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  const availablePresets = presets.filter((p) => !items.includes(p));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700">
        {label}
      </label>

      {/* Selected tags */}
      <div className="flex min-h-[36px] flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/50 p-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-800 shadow-2xs"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => onRemove(field, item)}
                className="cursor-pointer text-slate-400 hover:text-rose-600 focus:outline-hidden"
                aria-label={isAr ? `إزالة ${item}` : `Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400 italic">
            {isAr ? "لم يتم تحديد عناصر بعد" : "None selected yet"}
          </span>
        )}
      </div>

      {/* Quick-add presets */}
      {availablePresets.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {availablePresets.slice(0, 6).map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onAdd(field, preset)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-dashed border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              <Plus className="h-2.5 w-2.5" />
              <span>{preset}</span>
            </button>
          ))}
        </div>
      )}

      {/* Custom input */}
      <div className="flex gap-2 pt-1">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            (isAr ? "أضف عنصراً جديداً..." : "Type custom and press Enter...")
          }
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-hidden"
        />
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!customInput.trim()}
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAr ? "إضافة" : "Add"}
        </button>
      </div>
    </div>
  );
}
