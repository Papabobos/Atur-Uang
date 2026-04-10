// src/components/CurrencyInput.tsx
"use client";

import { useState, useCallback } from "react";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  required?: boolean;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  hint,
  required,
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);

  const displayValue =
    focused || value === 0
      ? value === 0
        ? ""
        : String(value)
      : new Intl.NumberFormat("id-ID").format(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      onChange(raw ? parseInt(raw, 10) : 0);
    },
    [onChange]
  );

  return (
    <div className="group flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-widest text-slate-400 transition-colors group-focus-within:text-amber-400">
        {label}
        {required && <span className="ml-1 text-amber-400">*</span>}
      </label>
      <div
        className={`relative flex items-center rounded-xl border bg-ink-800 transition-all duration-200 ${
          focused
            ? "border-amber-400/60 shadow-[0_0_0_3px_rgba(251,191,36,0.08)]"
            : "border-ink-700 hover:border-slate-400/30"
        }`}
      >
        <span className="pl-4 pr-2 font-mono text-sm text-slate-400">Rp</span>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0"
          className="flex-1 bg-transparent py-3.5 pr-4 font-mono text-sm text-slate-200 placeholder-slate-600 outline-none"
        />
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
