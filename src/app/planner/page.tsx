"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronDown, ChevronUp, CheckCircle2, SkipForward,
  Circle, Clock, GitCommit, Star, Filter, X, ArrowRight,
  StickyNote, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore, type DayStatus } from "@/store/roadmap-store";
import { PHASES, ALL_WEEKS, getPhaseForWeek, type Week, type Day } from "@/data/roadmap-data";
import { getPhaseColor, cn } from "@/lib/utils";
import { showToast } from "@/components/providers/toast-provider";

// ─── Day card ─────────────────────────────────────────────────────────────────
function DayCard({ day, dayIndex, weekNum, phaseColor }: {
  day: Day;
  dayIndex: number;
  weekNum: number;
  phaseColor: string;
}) {
  const { getDayProgress, setDayStatus, updateDayProgress } = useRoadmapStore();
  const prog = getDayProgress(weekNum, dayIndex);
  const status = prog.status;
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(prog.notes || "");
  const [actualTime, setActualTime] = useState(prog.actualTime?.toString() || "");

  const cycleStatus = () => {
    const next: DayStatus = !status ? "done" : status === "done" ? "skipped" : null;
    setDayStatus(weekNum, dayIndex, next);
    if (next === "done") showToast("Day marked as done! 🎉", "success");
    if (next === "skipped") showToast("Day skipped", "warning");
  };

  const saveNote = () => {
    updateDayProgress(weekNum, dayIndex, {
      notes,
      actualTime: actualTime ? parseFloat(actualTime) : undefined,
    });
    showToast("Progress saved!", "success");
    setExpanded(false);
  };

  const statusColors = {
    done: "bg-emerald-500/15 border-emerald-500/25",
    skipped: "bg-amber-500/15 border-amber-500/25",
    null: "bg-white/3 border-white/8",
  };

  const bgClass = statusColors[status || "null"];

  return (
    <motion.div
      layout
      className={cn("rounded-xl border transition-colors", bgClass)}
    >
      <div className="flex items-start gap-3 p-3">
        {/* Status toggle */}
        <button
          onClick={cycleStatus}
          className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
          title="Click to cycle: pending → done → skipped"
        >
          {status === "done" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : status === "skipped" ? (
            <SkipForward className="w-5 h-5 text-amber-400" />
          ) : (
            <Circle className="w-5 h-5 text-white/20 hover:text-white/40 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          {/* Day label + title */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {day.d}
            </span>
            {day.skipOk && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-medium">
                skip-ok
              </span>
            )}
          </div>
          <p className={cn("text-sm font-medium leading-snug", status === "done" && "line-through text-muted-foreground")}>
            {day.title}
          </p>

          {/* Tasks */}
          <div className="mt-2 space-y-0.5">
            {day.tasks.map((task, ti) => {
              const isDSA = task.toLowerCase().includes("dsa") || task.toLowerCase().includes("leetcode");
              return (
                <div key={ti} className={cn("flex items-start gap-1.5 text-xs", isDSA ? "text-emerald-400/80" : "text-muted-foreground")}>
                  <div className={cn("w-1 h-1 rounded-full mt-1.5 flex-shrink-0", isDSA ? "bg-emerald-400" : "bg-white/20")} />
                  {task}
                </div>
              );
            })}
          </div>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Clock className="w-2.5 h-2.5" />{day.time}
            </span>
            {day.commit && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 truncate max-w-[160px]">
                <GitCommit className="w-2.5 h-2.5 flex-shrink-0" />
                <span className="truncate">{day.commit}</span>
              </span>
            )}
            {day.deliverable && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Star className="w-2.5 h-2.5" />{day.deliverable}
              </span>
            )}
          </div>

          {/* Expand for notes */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mt-2 transition-colors"
          >
            <StickyNote className="w-3 h-3" />
            {expanded ? "Hide notes" : "Add notes / time"}
            <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground mb-1 block">Actual time (hrs)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={actualTime}
                        onChange={(e) => setActualTime(e.target.value)}
                        placeholder={day.time}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground mb-1 block">Notes / Reflection</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="What did you learn today?"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                  <button
                    onClick={saveNote}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Week accordion ───────────────────────────────────────────────────────────
function WeekAccordion({ week, defaultOpen }: { week: Week; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const { dayProgress } = useRoadmapStore();
  const phase = getPhaseForWeek(week.w);
  const phaseColor = phase?.color || "#378ADD";

  const { done, total } = useMemo(() => {
    let done = 0;
    for (let di = 0; di < week.days.length; di++) {
      const key = `w${week.w}_d${di}`;
      if (dayProgress[key]?.status === "done") done++;
    }
    return { done, total: week.days.length };
  }, [dayProgress, week]);

  const pct = Math.round((done / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/2 transition-colors text-left"
      >
        <span
          className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
          style={{ background: `${phaseColor}20`, color: phaseColor }}
        >
          W{week.w}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{week.title}</p>
          <p className="text-xs text-muted-foreground truncate">{week.sub}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground">{done}/{total}</span>
          <Link
            href={`/planner/${week.w}`}
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {open ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/5">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, background: phaseColor }}
        />
      </div>

      {/* Days */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-2">
              {week.days.map((day, di) => (
                <DayCard
                  key={di}
                  day={day}
                  dayIndex={di}
                  weekNum={week.w}
                  phaseColor={phaseColor}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Planner content ──────────────────────────────────────────────────────────
function PlannerContent() {
  const searchParams = useSearchParams();
  const phaseParam = searchParams.get("phase");
  const weekParam = searchParams.get("week");

  const [activePhase, setActivePhase] = useState(phaseParam || "p1");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (phaseParam) setActivePhase(phaseParam);
  }, [phaseParam]);

  const visibleWeeks = useMemo(() => {
    const phase = PHASES.find((p) => p.id === activePhase);
    if (!phase) return [];
    let weeks = ALL_WEEKS.filter((w) => phase.weeks.includes(w.w));
    if (search.trim()) {
      const q = search.toLowerCase();
      weeks = weeks.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.sub.toLowerCase().includes(q) ||
          w.days.some(
            (d) =>
              d.title.toLowerCase().includes(q) ||
              d.tasks.some((t) => t.toLowerCase().includes(q))
          )
      );
    }
    return weeks;
  }, [activePhase, search]);

  const targetWeek = weekParam ? parseInt(weekParam) : null;

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Interactive Planner</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Click any day to mark complete · Expand weeks for full details
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks, weeks…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Phase tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {PHASES.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-xl font-medium border transition-all",
              activePhase === phase.id
                ? "text-white border-transparent"
                : "bg-white/3 border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
            style={
              activePhase === phase.id
                ? { background: phase.color, borderColor: phase.color }
                : {}
            }
          >
            {phase.label.replace("Phase ", "Ph ").replace(" — ", " ")}
          </button>
        ))}
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {visibleWeeks.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Filter className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No weeks match your search</p>
            <button
              onClick={() => setSearch("")}
              className="text-sm text-blue-400 hover:text-blue-300 mt-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          visibleWeeks.map((wk) => (
            <WeekAccordion
              key={wk.w}
              week={wk}
              defaultOpen={targetWeek === wk.w}
            />
          ))
        )}
      </div>
    </AppShell>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div />}>
      <PlannerContent />
    </Suspense>
  );
}
