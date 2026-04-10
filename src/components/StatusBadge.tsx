// src/components/StatusBadge.tsx

import type { PlanStatus } from "@/types/planner";

const STATUS_CONFIG: Record<
  PlanStatus,
  { label: string; color: string; bg: string; border: string; glow: string; icon: string }
> = {
  realistis: {
    label: "Mantap, Bisalah Ini!",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_30px_rgba(52,211,153,0.12)]",
    icon: "✓",
  },
  ketat: {
    label: "Mepet Cuy, Hemat-Hemat Dah!",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.12)]",
    icon: "⚡",
  },
  tidak_realistis: {
    label: "Ampas Sih Ini! Mesti Cari Cara Lain Deh",
    color: "text-rose-400",
    bg: "bg-rose-400/8",
    border: "border-rose-400/30",
    glow: "shadow-[0_0_30px_rgba(251,113,133,0.12)]",
    icon: "△",
  },
};

export default function StatusBadge({ status }: { status: PlanStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 ${cfg.bg} ${cfg.border} ${cfg.glow}`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border ${cfg.border} ${cfg.color} text-lg font-bold`}
      >
        {cfg.icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">Status</p>
        <p className={`text-base font-bold ${cfg.color}`}>{cfg.label}</p>
      </div>
    </div>
  );
}
