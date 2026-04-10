// src/components/PlannerResult.tsx
"use client";

import type { PlannerResult } from "@/types/planner";
import { formatCurrency, formatPercent } from "@/lib/calculations";
import StatusBadge from "./StatusBadge";

interface PlannerResultProps {
  result: PlannerResult;
}

export default function PlannerResultView({ result }: PlannerResultProps) {
  const years = Math.floor(result.totalMonths / 12);
  const months = result.totalMonths % 12;
  const timeLabel =
    years > 0
      ? `${years} Tahun${months > 0 ? ` ${months} Bulan` : ""}`
      : `${months} Bulan`;

  return (
    <div className="flex flex-col gap-5 animate-fade-up">
      {/* Status */}
      <StatusBadge status={result.status} />

      {/* Main Metric */}
      <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Wajib nabung per bulan
        </p>
        <p className="mt-1 font-display text-3xl font-normal text-amber-400">
          {formatCurrency(result.monthlySavingNeeded)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {formatPercent(result.savingRatio)} dari penghasilan · selama {timeLabel}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Sisa Target"
          value={formatCurrency(result.remainingTarget)}
          sub="yang perlu ditabung"
        />
        <StatCard
          label="Surplus Saat Ini"
          value={formatCurrency(result.currentMonthlySurplus)}
          sub="per bulan"
          highlight={result.currentMonthlySurplus < result.monthlySavingNeeded}
        />
        <StatCard
          label="Proyeksi Tabungan"
          value={formatCurrency(result.projectedSavings)}
          sub={`dalam ${timeLabel}`}
        />
        <StatCard
          label="Waktu Realistis"
          value={
            result.projectedMonths
              ? result.projectedMonths >= 12
                ? `${Math.floor(result.projectedMonths / 12)}t ${result.projectedMonths % 12}b`
                : `${result.projectedMonths} bln`
              : "—"
          }
          sub="dgn surplus saat ini"
        />
      </div>

      {/* Cashflow Bar */}
      <CashflowBar
        income={result.breakdown[0].value}
        expense={result.breakdown[1].value}
        needed={result.monthlySavingNeeded}
      />

      {/* Recommendations */}
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-slate-500">Rekomendasi</p>
        {result.recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl border border-ink-700 bg-ink-800 p-4"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="mt-0.5 text-amber-400 text-xs font-mono shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-rose-400/30 bg-rose-400/5" : "border-ink-700 bg-ink-800"
      }`}
    >
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`mt-1 font-mono text-sm font-semibold ${
          highlight ? "text-rose-400" : "text-slate-200"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-slate-600">{sub}</p>
    </div>
  );
}

function CashflowBar({
  income,
  expense,
  needed,
}: {
  income: number;
  expense: number;
  needed: number;
}) {
  const expenseRatio = Math.min((expense / income) * 100, 100);
  const neededRatio = Math.min((needed / income) * 100, 100 - expenseRatio);
  const surplusRatio = Math.max(100 - expenseRatio - neededRatio, 0);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-ink-700 bg-ink-800 p-4">
      <p className="text-xs uppercase tracking-widest text-slate-500">Alokasi Penghasilan</p>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-ink-700">
        <div
          className="h-full bg-rose-400/70 transition-all duration-700"
          style={{ width: `${expenseRatio}%` }}
        />
        <div
          className="h-full bg-amber-400/80 transition-all duration-700"
          style={{ width: `${neededRatio}%` }}
        />
        <div
          className="h-full bg-emerald-400/60 transition-all duration-700"
          style={{ width: `${surplusRatio}%` }}
        />
      </div>
      <div className="flex gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-rose-400/70" />
          Pengeluaran ({expenseRatio.toFixed(0)}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-amber-400/80" />
          Target ({Math.min(neededRatio, 100).toFixed(0)}%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-emerald-400/60" />
          Sisa ({surplusRatio.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
}
