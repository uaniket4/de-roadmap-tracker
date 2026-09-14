// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(hours: string): string {
  const h = parseFloat(hours);
  if (isNaN(h)) return hours;
  const wholeHours = Math.floor(h);
  const minutes = Math.round((h - wholeHours) * 60);
  if (minutes === 0) return `${wholeHours}h`;
  if (wholeHours === 0) return `${minutes}m`;
  return `${wholeHours}h ${minutes}m`;
}

export function getPhaseColor(phaseId: string): string {
  const colors: Record<string, string> = {
    p1: "#378ADD",
    p2: "#1D9E75",
    p3: "#7F77DD",
    p4: "#BA7517",
    p5: "#0F6E56",
    p6: "#712B13",
    p7: "#D4537E",
    p8: "#791F1F",
  };
  return colors[phaseId] || "#378ADD";
}

export function getPhaseGradient(phaseId: string): string {
  const gradients: Record<string, string> = {
    p1: "from-blue-500/20 to-blue-600/10",
    p2: "from-emerald-500/20 to-emerald-600/10",
    p3: "from-violet-500/20 to-violet-600/10",
    p4: "from-amber-500/20 to-amber-600/10",
    p5: "from-teal-500/20 to-teal-600/10",
    p6: "from-orange-700/20 to-orange-800/10",
    p7: "from-pink-500/20 to-pink-600/10",
    p8: "from-red-800/20 to-red-900/10",
  };
  return gradients[phaseId] || "from-blue-500/20 to-blue-600/10";
}

export function getDayStatus(status: string | null): "done" | "skipped" | "none" {
  if (status === "done") return "done";
  if (status === "skipped") return "skipped";
  return "none";
}

export function calculateStreak(dayStates: Record<string, string>): { current: number; longest: number } {
  let current = 0;
  let longest = 0;
  let run = 0;

  const keys = Object.keys(dayStates).sort();
  for (const key of keys) {
    if (dayStates[key] === "done") {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  // Calculate current streak from the end
  let currentRun = 0;
  for (let i = keys.length - 1; i >= 0; i--) {
    if (dayStates[keys[i]] === "done") {
      currentRun++;
    } else {
      break;
    }
  }
  current = currentRun;

  return { current, longest };
}

export function getXPForLevel(level: number): number {
  return level * 1000;
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export function getXPProgressInLevel(xp: number): number {
  return xp % 1000;
}

export const ROADMAP_START_DATE = "2026-06-01";

export function getRoadmapPosition(date = new Date()): { weekNum: number; dayIndex: number } | null {
  const start = new Date(`${ROADMAP_START_DATE}T00:00:00`);
  const target = new Date(date);
  start.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const dayOffset = Math.floor((target.getTime() - start.getTime()) / 86400000);
  if (dayOffset < 0 || dayOffset >= 39 * 7) return null;
  return {
    weekNum: Math.floor(dayOffset / 7) + 1,
    dayIndex: dayOffset % 7,
  };
}

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (!hours) return `${mins}m`;
  if (!mins) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
