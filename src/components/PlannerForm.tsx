// src/components/PlannerForm.tsx
"use client";

import CurrencyInput from "./CurrencyInput";
import type { PlannerInput } from "@/types/planner";

interface PlannerFormProps {
  input: PlannerInput;
  isValid: boolean;
  onUpdate: <K extends keyof PlannerInput>(field: K, value: PlannerInput[K]) => void;
  onCalculate: () => void;
  onReset: () => void;
  hasCalculated: boolean;
}

export default function PlannerForm({
  input,
  isValid,
  onUpdate,
  onCalculate,
  onReset,
  hasCalculated,
}: PlannerFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Target Keuangan */}
      <div className="flex flex-col gap-4">
        <SectionLabel icon="◎" label="Target Barang Inceran" />
        <CurrencyInput
          label="Harga Barang Yang Diincer"
          value={input.targetAmount}
          onChange={(v) => onUpdate("targetAmount", v)}
          hint="Masukin jumlah duit yang dibutuhin"
          required
        />
        <CurrencyInput
          label="Duit Lo Sekarang Ada Berapa?"
          value={input.currentSavings}
          onChange={(v) => onUpdate("currentSavings", v)}
          hint="Uang yang lo pegang sekarang ada berapa?"
        />
      </div>

      <Divider />

      {/* Waktu */}
      <div className="flex flex-col gap-4">
        <SectionLabel icon="◷" label="Berapa Lama" />
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Durasi <span className="text-amber-400">*</span>
            </label>
            <input
              type="number"
              min={1}
              value={input.timeValue || ""}
              onChange={(e) =>
                onUpdate("timeValue", parseInt(e.target.value) || 0)
              }
              placeholder="12"
              className="rounded-xl border border-ink-700 bg-ink-800 px-4 py-3.5 font-mono text-sm text-slate-200 placeholder-slate-600 outline-none transition-all hover:border-slate-400/30 focus:border-amber-400/60 focus:shadow-[0_0_0_3px_rgba(251,191,36,0.08)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Satuan
            </label>
            <div className="flex gap-2">
              {(["bulan", "tahun"] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => onUpdate("timeUnit", unit)}
                  className={`rounded-xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                    input.timeUnit === unit
                      ? "border-amber-400/60 bg-amber-400/10 text-amber-400"
                      : "border-ink-700 bg-ink-800 text-slate-400 hover:border-slate-400/40 hover:text-slate-300"
                  }`}
                >
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Keuangan Bulanan */}
      <div className="flex flex-col gap-4">
        <SectionLabel icon="◈" label="Duit Tiap Bulan" />
        <CurrencyInput
          label="Duit Masuk Bulanan"
          value={input.monthlyIncome}
          onChange={(v) => onUpdate("monthlyIncome", v)}
          hint="Total duit yang masuk tiap bulan (gaji, bisnis, dll)"
          required
        />
        <CurrencyInput
          label="Duit Keluar Bulanan"
          value={input.monthlyExpense}
          onChange={(v) => onUpdate("monthlyExpense", v)}
          hint="Total duit rutin keluar tiap bulan"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCalculate}
          disabled={!isValid}
          className={`flex-1 rounded-xl py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
            isValid
              ? "bg-amber-400 text-ink-950 hover:bg-amber-300 hover:shadow-[0_0_24px_rgba(251,191,36,0.3)] active:scale-[0.98]"
              : "cursor-not-allowed bg-ink-700 text-slate-500"
          }`}
        >
          {hasCalculated ? "Coba Itung Yang Lain Ya" : "Itung Dah Target Gue!"}
        </button>
        {hasCalculated && (
          <button
            onClick={onReset}
            className="rounded-xl border border-ink-700 px-5 text-sm text-slate-400 transition-all hover:border-slate-400/40 hover:text-slate-300"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-amber-400 text-base">{icon}</span>
      <span className="text-sm font-semibold text-slate-300">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-ink-700" />;
}
