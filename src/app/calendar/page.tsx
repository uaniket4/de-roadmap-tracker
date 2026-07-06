"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore } from "@/store/roadmap-store";
import { PHASES, ALL_WEEKS, getPhaseForWeek } from "@/data/roadmap-data";
import { cn } from "@/lib/utils";

// Roadmap start date: June 2, 2026 (Monday of Week 1)
const ROADMAP_START = new Date(2026, 5, 2); // June 2, 2026

function getDateForDay(weekNum: number, dayIndex: number): Date {
  const totalDaysOffset = (weekNum - 1) * 7 + dayIndex;
  const d = new Date(ROADMAP_START);
  d.setDate(d.getDate() + totalDaysOffset);
  return d;
}

export default function CalendarPage() {
  const { dayProgress } = useRoadmapStore();
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1)); // June 2026

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));

  // Build a map of date → roadmap info
  const dateMap = useMemo(() => {
    const map: Record<string, {
      weekNum: number;
      dayIdx: number;
      dayTitle: string;
      deliverable: string | null;
      status: string | null;
      phaseColor: string;
    }> = {};
    ALL_WEEKS.forEach((wk) => {
      wk.days.forEach((day, di) => {
        const d = getDateForDay(wk.w, di);
        const key = d.toISOString().split("T")[0];
        const phase = getPhaseForWeek(wk.w);
        const progKey = `w${wk.w}_d${di}`;
        map[key] = {
          weekNum: wk.w,
          dayIdx: di,
          dayTitle: day.title,
          deliverable: day.deliverable,
          status: dayProgress[progKey]?.status || null,
          phaseColor: phase?.color || "#378ADD",
        };
      });
    });
    return map;
  }, [dayProgress]);

  // Calendar grid
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const result = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(d);
    return result;
  }, [firstDay, daysInMonth]);

  const todayStr = new Date().toISOString().split("T")[0];

  // Deliverables in this month
  const deliverables = useMemo(() => {
    return Object.entries(dateMap)
      .filter(([key, info]) => {
        const d = new Date(key);
        return d.getFullYear() === year && d.getMonth() === month && info.deliverable;
      })
      .sort(([a], [b]) => a.localeCompare(b));
  }, [dateMap, year, month]);

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Roadmap visualized — Jun 2026 to Feb 2027
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="glass-card p-5 lg:col-span-2">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-sm font-semibold">{monthLabel}</h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const info = dateMap[dateStr];
              const isToday = dateStr === todayStr;

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "relative aspect-square flex flex-col items-center justify-start pt-1 rounded-lg text-xs cursor-default transition-colors",
                    isToday && "ring-1 ring-blue-500/60",
                    info?.status === "done" && "bg-emerald-500/15",
                    info?.status === "skipped" && "bg-amber-500/15",
                    !info?.status && info && "bg-white/3 hover:bg-white/5",
                    !info && "opacity-30"
                  )}
                  title={info ? `${info.dayTitle}${info.deliverable ? ` · ★ ${info.deliverable}` : ""}` : ""}
                >
                  <span className={cn(
                    "font-medium",
                    isToday ? "text-blue-400" : "text-muted-foreground"
                  )}>
                    {day}
                  </span>
                  {info?.deliverable && (
                    <Star className="w-2 h-2 text-amber-400 absolute bottom-1" />
                  )}
                  {info?.status === "done" && (
                    <CheckCircle2 className="w-2 h-2 text-emerald-400 absolute bottom-1" />
                  )}
                  {info && (
                    <div
                      className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full"
                      style={{ background: info.phaseColor }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500/20" />
              <span className="text-[10px] text-muted-foreground">Done</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-500/20" />
              <span className="text-[10px] text-muted-foreground">Skipped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] text-muted-foreground">Deliverable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-blue-400" />
              <span className="text-[10px] text-muted-foreground">Phase dot</span>
            </div>
          </div>
        </div>

        {/* Deliverables sidebar */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold">Deliverables This Month</h3>
          </div>
          {deliverables.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No deliverables this month
            </p>
          ) : (
            <div className="space-y-2">
              {deliverables.map(([dateKey, info]) => {
                const d = new Date(dateKey);
                const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                return (
                  <div
                    key={dateKey}
                    className={cn(
                      "p-3 rounded-xl border text-xs",
                      info.status === "done"
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-white/3 border-white/8"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: info.phaseColor }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-amber-300 truncate">{info.deliverable}</p>
                        <p className="text-muted-foreground mt-0.5">{label} · W{info.weekNum}</p>
                        <p className="text-muted-foreground truncate">{info.dayTitle}</p>
                      </div>
                      {info.status === "done" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Phase color legend */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">Phases</p>
            <div className="space-y-1.5">
              {PHASES.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-[10px] text-muted-foreground">{p.label.replace("Phase ", "Ph ")} · {p.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
