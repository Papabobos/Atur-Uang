// src/lib/calculations.ts

import type { PlannerInput, PlannerResult, PlanStatus } from "@/types/planner";

export function convertToMonths(value: number, unit: "bulan" | "tahun"): number {
  return unit === "tahun" ? value * 12 : value;
}

export function determineStatus(savingRatio: number): PlanStatus {
  if (savingRatio <= 30) return "realistis";
  if (savingRatio <= 50) return "ketat";
  return "tidak_realistis";
}

export function generateRecommendations(
  input: PlannerInput,
  monthlySavingNeeded: number,
  currentSurplus: number,
  status: PlanStatus,
  totalMonths: number
): string[] {
  const recs: string[] = [];
  const gap = monthlySavingNeeded - currentSurplus;

  if (status === "realistis") {
    recs.push(
      `Sisihkan Rp ${formatNumber(monthlySavingNeeded)} setiap awal bulan sebelum pengeluaran lain.`
    );
    recs.push("Pertimbangkan investasi reksa dana atau deposito untuk pertumbuhan lebih optimal.");
    return recs;
  }

  if (status === "ketat") {
    recs.push(
      `Target cukup ketat — butuh ${formatPercent((monthlySavingNeeded / input.monthlyIncome) * 100)} dari penghasilan. Disiplin penuh diperlukan.`
    );
    recs.push("Audit pengeluaran rutin: cari pos yang bisa dikurangi setidaknya 10–15%.");
    recs.push("Pertimbangkan sumber penghasilan tambahan (freelance, investasi pasif).");
    return recs;
  }

  // Tidak realistis
  recs.push(
    `Kekurangan tabungan bulanan: Rp ${formatNumber(gap)} di luar kemampuan surplus saat ini (Rp ${formatNumber(currentSurplus)}).`
  );

  const extendedMonths = Math.ceil(
    (input.targetAmount - input.currentSavings) / Math.max(currentSurplus, 1)
  );
  if (currentSurplus > 0 && extendedMonths < totalMonths * 5) {
    const years = Math.floor(extendedMonths / 12);
    const months = extendedMonths % 12;
    const timeStr =
      years > 0
        ? `${years} tahun${months > 0 ? ` ${months} bulan` : ""}`
        : `${months} bulan`;
    recs.push(
      `Dengan surplus saat ini, target bisa tercapai dalam ${timeStr} — perpanjang waktu atau kurangi target.`
    );
  }

  const reducedTarget = Math.round(currentSurplus * totalMonths + input.currentSavings);
  if (reducedTarget > 0) {
    recs.push(
      `Target realistis dengan waktu ${totalMonths} bulan adalah Rp ${formatNumber(reducedTarget)}.`
    );
  }

  if (input.monthlyExpense / input.monthlyIncome > 0.7) {
    recs.push(
      "Rasio pengeluaran terlalu tinggi (>70% penghasilan). Fokus utama: kurangi pengeluaran tidak esensial."
    );
  }

  recs.push("Pertimbangkan instrumen investasi (reksa dana saham, P2P lending) untuk mempercepat pertumbuhan aset.");

  return recs;
}

export function calculatePlan(input: PlannerInput): PlannerResult {
  const totalMonths = convertToMonths(input.timeValue, input.timeUnit);
  const remainingTarget = Math.max(0, input.targetAmount - input.currentSavings);
  const monthlySavingNeeded = remainingTarget / totalMonths;
  const currentMonthlySurplus = input.monthlyIncome - input.monthlyExpense;
  const savingRatio =
    input.monthlyIncome > 0 ? (monthlySavingNeeded / input.monthlyIncome) * 100 : 100;

  const status = determineStatus(savingRatio);

  const projectedSavings =
    input.currentSavings + currentMonthlySurplus * totalMonths;

  const projectedMonths =
    currentMonthlySurplus > 0
      ? Math.ceil(remainingTarget / currentMonthlySurplus)
      : null;

  const recommendations = generateRecommendations(
    input,
    monthlySavingNeeded,
    currentMonthlySurplus,
    status,
    totalMonths
  );

  const breakdown = [
    { label: "Penghasilan Bulanan", value: input.monthlyIncome, type: "income" as const },
    { label: "Pengeluaran Bulanan", value: input.monthlyExpense, type: "expense" as const },
    { label: "Surplus Saat Ini", value: currentMonthlySurplus, type: "saving" as const },
    { label: "Target Tabungan/Bulan", value: monthlySavingNeeded, type: "remaining" as const },
  ];

  return {
    monthlySavingNeeded,
    totalMonths,
    remainingTarget,
    currentMonthlySurplus,
    savingRatio,
    status,
    projectedSavings,
    projectedMonths,
    recommendations,
    breakdown,
  };
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.round(value));
}

export function formatCurrency(value: number): string {
  return `Rp ${formatNumber(value)}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
