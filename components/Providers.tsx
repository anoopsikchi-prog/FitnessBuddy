"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadState, saveState, clearState } from "@/lib/storage";
import type { FitBuddyState, FitnessGoal, ActivityLevel, Barrier, Habit, MealCoachPref, Demographics } from "@/lib/types";

function defaultState(): FitBuddyState {
  return {
    displayName: "FitBuddy",
    onboarding: {
      goal: undefined,
      activity: undefined,
      barriers: [],
      habits: [],
      mealCoach: undefined,
      demographics: {},
      completed: false,
    },
    dashboard: {
      metrics: { steps: 0, activeMinutes: 0, waterMl: 0, streakDays: 0 },
      recentActivity: [],
    },
  };
}

const AppCtx = createContext<{
  state: FitBuddyState;
  setDisplayName: (name: string) => void;
  setGoal: (g: FitnessGoal) => void;
  setActivity: (a: ActivityLevel) => void;
  toggleBarrier: (b: Barrier) => void;
  setHabits: (h: Habit[]) => void;
  setMealCoach: (m: MealCoachPref) => void;
  setDemographics: (d: Demographics) => void;
  completeOnboarding: () => void;
  resetAll: () => void;
}>({} as any);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FitBuddyState>(() => loadState() ?? defaultState());

  useEffect(() => { saveState(state); }, [state]);

  const api = useMemo(() => ({
    state,
    setDisplayName: (name: string) => setState(s => ({ ...s, displayName: name })),
    setGoal: (g: FitnessGoal) => setState(s => ({ ...s, onboarding: { ...s.onboarding, goal: g } })),
    setActivity: (a: ActivityLevel) => setState(s => ({ ...s, onboarding: { ...s.onboarding, activity: a } })),
    toggleBarrier: (b: Barrier) => setState(s => ({
      ...s,
      onboarding: {
        ...s.onboarding,
        barriers: s.onboarding.barriers.includes(b)
          ? s.onboarding.barriers.filter(x => x !== b)
          : [...s.onboarding.barriers, b],
      },
    })),
    setHabits: (h: Habit[]) => setState(s => ({ ...s, onboarding: { ...s.onboarding, habits: h.slice(0, 4) } })),
    setMealCoach: (m: MealCoachPref) => setState(s => ({ ...s, onboarding: { ...s.onboarding, mealCoach: m } })),
    setDemographics: (d: Demographics) => setState(s => ({ ...s, onboarding: { ...s.onboarding, demographics: d } })),
    completeOnboarding: () => setState(s => ({ ...s, onboarding: { ...s.onboarding, completed: true } })),
    resetAll: () => { clearState(); setState(defaultState()); },
  }), [state]);

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export const useApp = () => useContext(AppCtx);