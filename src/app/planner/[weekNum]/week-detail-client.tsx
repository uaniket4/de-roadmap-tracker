"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, SkipForward, Circle, Clock,
  GitCommit, Star, StickyNote, ChevronDown, Target,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore, type DayStatus } from "@/store/roadmap-store";
import { ALL_WEEKS, getPhaseForWeek, type Day } from "@/data/roadmap-data";
import { cn } from "@/lib/utils";
import { showToast } from "@/components/providers/toast-provider";

// ─── Individual day card (needs its own state) ────────────────────────────────
function DayRow({ day, dayIndex, weekNum, phaseColor }: {
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
    if (next === "done") showToast(`${day.d} marked done! 🎉`, "success");
  };

  const bgClass = {
    done: "bg-emerald-500/10 border-emerald-500/20",
    skipped: "bg-amber-500/10 border-amber-500/20",
    null: "bg-white/3 border-white/8",
  }[status || "null"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayIndex * 0.04 }}
      className={cn("rounded-2xl border p-4 transition-colors", bgClass)}
    >
      <div className="flex items-start gap-3">
        <button onClick={cycleStatus} className="mt-0.5 flex-shrink-0 hover:scale-110 transition-transform">
          {status === "done" ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          ) : status === "skipped" ? (
            <SkipForward className="w-6 h-6 text-amber-400" />
          ) : (
            <Circle className="w-6 h-6 text-white/20 hover:text-white/40 transition-colors" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{day.d}</span>
            {day.skipOk && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400">skip-ok</span>
            )}
          </div>
          <p className={cn("text-base font-semibold leading-tight", status === "done" && "line-through text-muted-foreground")}>
            {day.title}
          </p>
          <div className="mt-2 space-y-1">
            {day.tasks.map((task, ti) => {
              const isDSA = task.toLowerCase().includes("dsa") || task.toLowerCase().includes("leetcode");
              return (
                <div key={ti} className={cn("flex items-start gap-2 text-sm", isDSA ? "text-emerald-400" : "text-muted-foreground")}>
                  <div className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", isDSA ? "bg-emerald-400" : "bg-white/20")} />
                  {task}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Clock className="w-3 h-3" />{day.time}
            </span>
            {day.commit && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 truncate max-w-[220px]">
                <GitCommit className="w-3 h-3 flex-shrink-0" /><span className="truncate">{day.commit}</span>
              </span>
            )}
            {day.deliverable && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Star className="w-3 h-3" />{day.deliverable}
              </span>
            )}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2.5 transition-colors"
          >
            <StickyNote className="w-3 h-3" />
            {expanded ? "Hide notes" : "Add notes / time spent"}
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
                <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
                  <input
                    type="number"
                    step="0.5"
                    value={actualTime}
                    onChange={(e) => setActualTime(e.target.value)}
                    placeholder={`Actual time (hrs, planned: ${day.time})`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
                  />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Reflection, what you learned, blockers…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 resize-none"
                  />
                  <button
                    onClick={() => {
                      updateDayProgress(weekNum, dayIndex, {
                        notes,
                        actualTime: actualTime ? parseFloat(actualTime) : undefined,
                      });
                      showToast("Saved!", "success");
                      setExpanded(false);
                    }}
                    className="text-sm px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    Save notes
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

// ─── Week note editor ─────────────────────────────────────────────────────────
function WeekNoteEditor({
  weekNum,
  initialNote,
  onSave,
}: {
  weekNum: number;
  initialNote: string;
  onSave: (w: number, c: string) => void;
}) {
  const [content, setContent] = useState(initialNote);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onSave(weekNum, content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    showToast("Week note saved!", "success");
  };

  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="Write your weekly review, key learnings, what you struggled with, what you'll do differently next week…"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/50 resize-none font-mono leading-relaxed"
      />
      <button
        onClick={save}
        className={cn(
          "px-4 py-2 rounded-xl text-sm font-medium border transition-all",
          saved
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            : "bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/20"
        )}
      >
        {saved ? "✓ Saved" : "Save week notes"}
      </button>
    </div>
  );
}

// ─── Main client component ────────────────────────────────────────────────────
export function WeekDetailClient({ weekNum }: { weekNum: number }) {
  const week = ALL_WEEKS.find((w) => w.w === weekNum);
  if (!week) return notFound();

  const phase = getPhaseForWeek(weekNum);
  const phaseColor = phase?.color || "#378ADD";

  const { dayProgress, weekNotes, setWeekNote } = useRoadmapStore();

  const done = week.days.filter((_, di) => dayProgress[`w${weekNum}_d${di}`]?.status === "done").length;
  const pct = Math.round((done / week.days.length) * 100);
  const note = weekNotes[weekNum]?.content || "";

  const prevWeek = weekNum > 1 ? weekNum - 1 : null;
  const nextWeek = weekNum < 39 ? weekNum + 1 : null;

  return (
    <AppShell>
      {/* Nav */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/planner"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{ background: `${phaseColor}20`, color: phaseColor }}
              >
                W{week.w}
              </span>
              <h1 className="text-xl font-bold">{week.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{week.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {prevWeek && (
            <Link href={`/planner/${prevWeek}`} className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-colors">
              ← W{prevWeek}
            </Link>
          )}
          {nextWeek && (
            <Link href={`/planner/${nextWeek}`} className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground transition-colors">
              W{nextWeek} →
            </Link>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass-card p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{done} / {week.days.length} days complete</span>
          </div>
          <span className="text-sm font-bold" style={{ color: phaseColor }}>{pct}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: phaseColor }}
          />
        </div>
        {phase && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">
              {phase.label} · {phase.period} · Project: <span style={{ color: phaseColor }}>{phase.project}</span>
            </span>
          </div>
        )}
      </div>

      {/* Days */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {week.days.map((day, di) => (
          <DayRow
            key={di}
            day={day}
            dayIndex={di}
            weekNum={weekNum}
            phaseColor={phaseColor}
          />
        ))}
      </div>

      {/* Week notes */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <StickyNote className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold">Week Notes / Review</h3>
        </div>
        <WeekNoteEditor weekNum={weekNum} initialNote={note} onSave={setWeekNote} />
      </div>
    </AppShell>
  );
}
