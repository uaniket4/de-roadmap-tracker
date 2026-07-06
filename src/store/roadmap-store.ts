// src/store/roadmap-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALL_WEEKS, PHASES } from "@/data/roadmap-data";
import { calculateStreak } from "@/lib/utils";

export type DayStatus = "done" | "skipped" | null;

export interface DayProgress {
  status: DayStatus;
  actualTime?: number;
  difficulty?: number;
  confidence?: number;
  notes?: string;
  reflection?: string;
  resourceLinks?: { url: string; title: string }[];
  updatedAt?: string;
}

export interface WeekNote {
  content: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  type: "video" | "doc" | "article" | "github" | "link";
  title: string;
  url: string;
  notes?: string;
  createdAt: string;
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  accentColor: "blue" | "violet" | "emerald" | "orange" | "rose";
}

export interface Stats {
  totalDone: number;
  totalSkipped: number;
  totalRequired: number;
  currentStreak: number;
  longestStreak: number;
  completionPct: number;
  totalStudyHours: number;
  phaseProgress: Record<string, { done: number; total: number; pct: number }>;
}

interface RoadmapState {
  dayProgress: Record<string, DayProgress>; // key: "w{weekNum}_d{dayIndex}"
  weekNotes: Record<number, WeekNote>;       // key: weekNum
  resources: Resource[];
  settings: UserSettings;
  activePhase: string;
  activeWeek: number | null;
  searchQuery: string;
  filterPhase: string | null;
  sidebarOpen: boolean;

  // Actions
  setDayStatus: (weekNum: number, dayIndex: number, status: DayStatus) => void;
  updateDayProgress: (weekNum: number, dayIndex: number, data: Partial<DayProgress>) => void;
  getDayProgress: (weekNum: number, dayIndex: number) => DayProgress;
  setWeekNote: (weekNum: number, content: string) => void;
  addResource: (resource: Omit<Resource, "id" | "createdAt">) => void;
  removeResource: (id: string) => void;
  setActivePhase: (phaseId: string) => void;
  setActiveWeek: (weekNum: number | null) => void;
  setSearchQuery: (q: string) => void;
  setFilterPhase: (phaseId: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetProgress: () => void;
  getStats: () => Stats;
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      dayProgress: {},
      weekNotes: {},
      resources: [],
      settings: {
        theme: "dark",
        accentColor: "blue",
      },
      activePhase: "p1",
      activeWeek: null,
      searchQuery: "",
      filterPhase: null,
      sidebarOpen: true,

      setDayStatus: (weekNum, dayIndex, status) => {
        const key = `w${weekNum}_d${dayIndex}`;
        set((state) => ({
          dayProgress: {
            ...state.dayProgress,
            [key]: {
              ...state.dayProgress[key],
              status,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },

      updateDayProgress: (weekNum, dayIndex, data) => {
        const key = `w${weekNum}_d${dayIndex}`;
        set((state) => ({
          dayProgress: {
            ...state.dayProgress,
            [key]: {
              ...state.dayProgress[key],
              ...data,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },

      getDayProgress: (weekNum, dayIndex) => {
        const key = `w${weekNum}_d${dayIndex}`;
        return get().dayProgress[key] || { status: null };
      },

      setWeekNote: (weekNum, content) => {
        set((state) => ({
          weekNotes: {
            ...state.weekNotes,
            [weekNum]: { content, updatedAt: new Date().toISOString() },
          },
        }));
      },

      addResource: (resource) => {
        const newResource: Resource = {
          ...resource,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ resources: [...state.resources, newResource] }));
      },

      removeResource: (id) => {
        set((state) => ({ resources: state.resources.filter((r) => r.id !== id) }));
      },

      setActivePhase: (phaseId) => set({ activePhase: phaseId }),
      setActiveWeek: (weekNum) => set({ activeWeek: weekNum }),
      setSearchQuery: (q) => set({ searchQuery: q }),
      setFilterPhase: (phaseId) => set({ filterPhase: phaseId }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      updateSettings: (settings) => {
        set((state) => ({ settings: { ...state.settings, ...settings } }));
      },

      resetProgress: () => {
        set({ dayProgress: {}, weekNotes: {} });
      },

      getStats: () => {
        const { dayProgress } = get();
        let totalDone = 0;
        let totalSkipped = 0;
        let totalRequired = 0;
        let totalStudyHours = 0;

        const phaseProgress: Record<string, { done: number; total: number; pct: number }> = {};

        PHASES.forEach((phase) => {
          phaseProgress[phase.id] = { done: 0, total: 0, pct: 0 };
        });

        ALL_WEEKS.forEach((wk) => {
          wk.days.forEach((day, di) => {
            const key = `w${wk.w}_d${di}`;
            const prog = dayProgress[key];
            const status = prog?.status ?? null;
            totalRequired++;
            if (status === "done") {
              totalDone++;
              phaseProgress[wk.phase].done++;
              totalStudyHours += prog?.actualTime || parseFloat(day.time) || 0;
            }
            if (status === "skipped") totalSkipped++;
            phaseProgress[wk.phase].total++;
          });
        });

        PHASES.forEach((phase) => {
          const p = phaseProgress[phase.id];
          p.pct = p.total > 0 ? Math.round((p.done / p.total) * 100) : 0;
        });

        // Calculate streaks from ordered day keys
        const allKeys: string[] = [];
        ALL_WEEKS.forEach((wk) => {
          wk.days.forEach((_, di) => {
            allKeys.push(`w${wk.w}_d${di}`);
          });
        });

        const statusMap: Record<string, string> = {};
        allKeys.forEach((key) => {
          statusMap[key] = dayProgress[key]?.status || "none";
        });

        const { current, longest } = calculateStreak(statusMap);

        return {
          totalDone,
          totalSkipped,
          totalRequired,
          currentStreak: current,
          longestStreak: longest,
          completionPct: totalRequired > 0 ? Math.round((totalDone / totalRequired) * 100) : 0,
          totalStudyHours: Math.round(totalStudyHours * 10) / 10,
          phaseProgress,
        };
      },

      exportData: () => {
        const { dayProgress, weekNotes, resources } = get();
        return JSON.stringify({ dayProgress, weekNotes, resources, exportedAt: new Date().toISOString() });
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          set({
            dayProgress: data.dayProgress || {},
            weekNotes: data.weekNotes || {},
            resources: data.resources || [],
          });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "de-roadmap-tracker-v1",
    }
  )
);
