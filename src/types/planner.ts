// src/types/planner.ts

export type TimeUnit = "bulan" | "tahun";

export interface PlannerInput {
  targetAmount: number;
  timeValue: number;
  timeUnit: TimeUnit;
  currentSavings: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

export type PlanStatus = "realistis" | "ketat" | "tidak_realistis";

export interface PlannerResult {
  monthlySavingNeeded: number;
  totalMonths: number;
  remainingTarget: number;
  currentMonthlySurplus: number;
  savingRatio: number; // percentage of income needed for saving
  status: PlanStatus;
  projectedSavings: number; // how much they'd save at current rate
  projectedMonths: number | null; // months to reach goal at current rate
  recommendations: string[];
  breakdown: {
    label: string;
    value: number;
    type: "income" | "expense" | "saving" | "remaining";
  }[];
}
