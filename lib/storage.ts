import type { FitBuddyState } from "./types";

export const STORAGE_KEY = "fitbuddy.v1";

export const loadState = (): FitBuddyState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FitBuddyState) : null;
  } catch {
    return null;
  }
};

export const saveState = (state: FitBuddyState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

export const clearState = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};