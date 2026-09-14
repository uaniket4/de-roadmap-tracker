"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, CheckCircle2, Clock3, Flame, Pause, Play,
  RotateCcw, ShieldCheck, Star, Target, TrendingUp, X,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ALL_WEEKS, PHASES, getPhaseForWeek } from "@/data/roadmap-data";
import { useRoadmapStore } from "@/store/roadmap-store";
import { formatMinutes, getRoadmapPosition, formatTime, cn } from "@/lib/utils";

function parseMinutes(time: string) {
  const hours = parseFloat(time);
  return Number.isFinite(hours) ? Math.round(hours * 60) : 0;
}

function greeting(hour: number) {
  if (hour < 12) return "GOOD MORNING";
  if (hour < 18) return "GOOD AFTERNOON";
  return "GOOD EVENING";
}

function SessionModal({ weekNum, dayIndex, date, onClose }: {
  weekNum: number; dayIndex: number; date: string; onClose: () => void;
}) {
  const day = ALL_WEEKS[weekNum - 1]?.days[dayIndex];
  const { currentSession, startFocusSession, pauseFocusSession, resumeFocusSession, finishFocusSession, updateFocusSessionElapsed } = useRoadmapStore();
  const [elapsed, setElapsed] = useState(currentSession?.elapsedSeconds || 0);
  const [started, setStarted] = useState(Boolean(currentSession));

  useEffect(() => {
    if (!started || currentSession?.paused) return;
    const timer = window.setInterval(() => setElapsed((value) => {
      const next = value + 1;
      updateFocusSessionElapsed(next);
      return next;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [started, currentSession?.paused, updateFocusSessionElapsed]);

  if (!day) return null;
  const time = `${Math.floor(elapsed / 3600).toString().padStart(2, "0")}:${Math.floor((elapsed % 3600) / 60).toString().padStart(2, "0")}:${(elapsed % 60).toString().padStart(2, "0")}`;
  const toggle = () => {
    if (!started) {
      startFocusSession(weekNum, dayIndex, date);
      setStarted(true);
    } else if (currentSession?.paused) {
      resumeFocusSession();
    } else {
      pauseFocusSession(elapsed);
    }
  };
  const finish = () => {
    finishFocusSession(elapsed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Focus session">
      <div className="glass-card w-full max-w-lg p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Focus session</span>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-white/10" aria-label="Close session"><X className="h-4 w-4" /></button>
        </div>
        <p className="mt-8 text-xs uppercase tracking-wider text-muted-foreground">Current task</p>
        <h2 className="mt-2 text-2xl font-bold">{day.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Estimated {day.time} · {day.tasks.length} focused steps</p>
        <div className="my-8 text-center text-5xl font-mono font-semibold tracking-tight">{time}</div>
        <div className="flex gap-3">
          <button onClick={toggle} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-400">
            {started && !currentSession?.paused ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> {started ? "Resume" : "Start focus session"}</>}
          </button>
          <button onClick={finish} disabled={!started} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 disabled:opacity-40">
            Complete task
          </button>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">Pause and come back anytime. Your elapsed time is saved with this task.</p>
      </div>
    </div>
  );
}

function MissionCard({ weekNum, dayIndex, date }: { weekNum: number; dayIndex: number; date: string }) {
  const day = ALL_WEEKS[weekNum - 1]?.days[dayIndex];
  const { getDayProgress, dailyCommitment, lockDailyCommitment, adjustDailyCommitment, setMinimumDay } = useRoadmapStore();
  const progress = day ? getDayProgress(weekNum, dayIndex) : { status: null };
  const [sessionOpen, setSessionOpen] = useState(false);
  if (!day) return null;
  const targetMinutes = parseMinutes(day.time);
  const done = progress.status === "done" || progress.status === "reduced";
  const lockedToday = dailyCommitment?.date === date && dailyCommitment.locked;
  const lockIn = () => lockDailyCommitment({ date, targetMinutes, minimumMinutes: 30, mode: "full" });

  return (
    <>
      <section className="glass-card overflow-hidden border-blue-400/20">
        <div className="border-b border-white/10 bg-blue-500/10 p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Today&apos;s mission</p>
              <h2 className="mt-2 text-2xl font-bold">{day.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{weekNum === 1 ? "Start strong and make the first session count." : `Week ${weekNum} · ${ALL_WEEKS[weekNum - 1]?.title}`}</p>
            </div>
            {day.deliverable && <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300"><Star className="h-3.5 w-3.5" /> Deliverable</span>}
          </div>
        </div>
        <div className="space-y-4 p-5 sm:p-7">
          <div className="space-y-2">
            {day.tasks.map((task, index) => <div key={task} className="flex items-start gap-3 text-sm"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] text-muted-foreground">{index + 1}</span><span className="text-muted-foreground">{task}</span></div>)}
          </div>
          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-blue-300" /> {day.time}</span>
            <span>{done ? "Mission complete" : `${day.tasks.length} steps to complete`}</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {done ? <div className="flex flex-1 items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Today&apos;s mission complete</div> : <button onClick={() => setSessionOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-400"><Play className="h-4 w-4" /> Start today</button>}
            {!done && !lockedToday && <button onClick={lockIn} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/5">Lock in today</button>}
            {!done && lockedToday && <button onClick={() => setSessionOpen(true)} className="flex items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200"><ShieldCheck className="h-4 w-4" /> Committed</button>}
          </div>
          {!done && <div className="flex items-center justify-between text-xs text-muted-foreground"><button onClick={() => setMinimumDay(date, weekNum, dayIndex)} className="hover:text-amber-300">Need a smaller win? Activate emergency mode (30m)</button>{lockedToday && <button onClick={adjustDailyCommitment} className="underline hover:text-foreground">Adjust plan</button>}</div>}
        </div>
      </section>
      {sessionOpen && <SessionModal weekNum={weekNum} dayIndex={dayIndex} date={date} onClose={() => setSessionOpen(false)} />}
    </>
  );
}

export default function DashboardPage() {
  const [now, setNow] = useState(() => new Date());
  const { dayProgress, getStats, dailyCommitment } = useRoadmapStore();
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 60000); return () => window.clearInterval(id); }, []);
  const date = now.toISOString().slice(0, 10);
  const position = getRoadmapPosition(now);
  const fallback = ALL_WEEKS.flatMap((week) => week.days.map((_, index) => ({ weekNum: week.w, dayIndex: index }))).find(({ weekNum, dayIndex }) => !dayProgress[`w${weekNum}_d${dayIndex}`]?.status);
  const current = position || fallback || { weekNum: 39, dayIndex: 6 };
  const week = ALL_WEEKS[current.weekNum - 1];
  const day = week?.days[current.dayIndex];
  const phase = getPhaseForWeek(current.weekNum);
  const stats = getStats();
  const weekStats = useMemo(() => {
    const days = week?.days || [];
    let done = 0; let planned = 0; let actual = 0;
    days.forEach((item, index) => { planned += parseMinutes(item.time); const progress = dayProgress[`w${current.weekNum}_d${index}`]; if (progress?.status === "done" || progress?.status === "reduced") done++; actual += (progress?.actualTime || 0) * 60; });
    return { done, total: days.length, planned, actual, execution: planned ? Math.min(100, Math.round((actual / planned) * 100)) : 0 };
  }, [dayProgress, week, current.weekNum]);
  const greetingText = greeting(now.getHours());

  return <AppShell>
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-bold tracking-[0.25em] text-blue-300">{greetingText}</p><h1 className="mt-2 text-3xl font-bold">{now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h1><p className="mt-1 text-sm text-muted-foreground">Week {current.weekNum} of 39 · {phase?.label || "Roadmap complete"}</p></div>
      <Link href={`/planner/${current.weekNum}`} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-white/5 hover:text-foreground">Open planner <ArrowRight className="h-3.5 w-3.5" /></Link>
    </header>
    {position ? <MissionCard weekNum={current.weekNum} dayIndex={current.dayIndex} date={date} /> : <div className="glass-card p-8 text-center"><Target className="mx-auto h-8 w-8 text-blue-300" /><h2 className="mt-3 text-xl font-bold">Your roadmap is between cycles</h2><p className="mt-2 text-sm text-muted-foreground">Today is outside the scheduled Jun 2026 – Feb 2027 roadmap period. Your next incomplete day is ready when you are.</p></div>}
    <section className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="glass-card p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today</p><p className="mt-1 text-lg font-bold">{dayProgress[`w${current.weekNum}_d${current.dayIndex}`]?.status === "done" || dayProgress[`w${current.weekNum}_d${current.dayIndex}`]?.status === "reduced" ? "1 / 1 task" : "0 / 1 task"}</p></div><span className="text-sm text-muted-foreground">{day ? day.time : "—"}</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${dayProgress[`w${current.weekNum}_d${current.dayIndex}`]?.status === "done" || dayProgress[`w${current.weekNum}_d${current.dayIndex}`]?.status === "reduced" ? 100 : 0}%` }} /></div></div>
      <div className={cn("glass-card p-5", weekStats.execution < 70 && "border-amber-400/20")}><div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-300" /><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Momentum</p></div><p className="mt-2 text-lg font-bold">{stats.currentStreak} day streak</p><p className="mt-1 text-xs text-muted-foreground">{dayProgress[`w${current.weekNum}_d${current.dayIndex}`]?.status ? "Keep the momentum going." : "Complete today to preserve your streak."}</p></div>
    </section>
    <section className="mt-4 grid gap-4 lg:grid-cols-2">
      <div className="glass-card p-5"><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-violet-300" /><h2 className="text-sm font-semibold">Weekly execution</h2></div><div className="mt-4 grid grid-cols-3 gap-3 text-center"><div><p className="text-xl font-bold">{weekStats.execution}%</p><p className="text-[11px] text-muted-foreground">execution</p></div><div><p className="text-xl font-bold">{weekStats.done}/{weekStats.total}</p><p className="text-[11px] text-muted-foreground">tasks</p></div><div><p className="text-xl font-bold">{formatMinutes(Math.round(weekStats.actual))}</p><p className="text-[11px] text-muted-foreground">logged</p></div></div><div className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-violet-400" style={{ width: `${weekStats.execution}%` }} /></div></div>
      <div className="glass-card p-5"><div className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-amber-300" /><h2 className="text-sm font-semibold">Recovery</h2></div><p className="mt-3 text-sm text-muted-foreground">{dailyCommitment?.mode === "minimum" ? "Emergency mode is active. A smaller honest win still protects your momentum." : "If the full plan is too much, choose a 30-minute minimum day instead of disappearing."}</p><Link href="/planner" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-blue-200">Review overdue work <ArrowRight className="h-3 w-3" /></Link></div>
    </section>
    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-300" /> {stats.totalDone} days completed</span><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-blue-300" /> {stats.totalStudyHours}h logged</span><span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-300" /> {stats.completionPct}% roadmap progress</span></div>
  </AppShell>;
}
