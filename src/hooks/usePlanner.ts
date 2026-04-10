// src/hooks/usePlanner.ts

import { useState, useCallback } from "react";
import type { PlannerInput, PlannerResult } from "@/types/planner";
import { calculatePlan } from "@/lib/calculations";

const DEFAULT_INPUT: PlannerInput = {
  targetAmount: 0,
  timeValue: 12,
  timeUnit: "bulan",
  currentSavings: 0,
  monthlyIncome: 0,
  monthlyExpense: 0,
};

export function usePlanner() {
  const [input, setInput] = useState<PlannerInput>(DEFAULT_INPUT);
  const [result, setResult] = useState<PlannerResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const updateField = useCallback(
    <K extends keyof PlannerInput>(field: K, value: PlannerInput[K]) => {
      setInput((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const calculate = useCallback(() => {
    const computed = calculatePlan(input);
    setResult(computed);
    setHasCalculated(true);
  }, [input]);

  const reset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setResult(null);
    setHasCalculated(false);
  }, []);

  const isValid =
    input.targetAmount > 0 &&
    input.timeValue > 0 &&
    input.monthlyIncome > 0;

  return { input, result, hasCalculated, isValid, updateField, calculate, reset };
}
