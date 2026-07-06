"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Flame, CheckCircle2, SkipForward, BarChart2, Clock,
  TrendingUp, Calendar, Target, Trophy, Zap, ChevronRight,
  Star, Activity, GitCommit,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore } from "@/store/roadmap-store";
import { PHASES, ALL_WEEKS, getPhaseForWeek } from "@/data/roadmap-data";
import { getPhaseColor, cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar,
} from "recharts";

// ─── Animated stat card ───────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="glass-card p-5 relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{ background: `radial-gradient(circle at 80% 20%, ${color}, transparent 60%)` }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div
          className="p-2.5 rounded-xl"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Phase progress row ───────────────────────────────────────────────────────
function PhaseBar({ phase, pct, delay }: { phase: (typeof PHASES)[0]; pct: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 group"
    >
      <div className="w-36 text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors">
        {phase.label.replace("Phase ", "Ph ")}
      </div>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.2, duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: phase.color }}
        />
      </div>
      <span className="text-xs font-medium w-9 text-right" style={{ color: phase.color }}>
        {pct}%
      </span>
    </motion.div>
  );
}

// ─── Upcoming deliverables ────────────────────────────────────────────────────
function UpcomingDeliverables({ dayProgress }: { dayProgress: Record<string, { status: string | null }> }) {
  const upcoming = useMemo(() => {
    const items: { week: number; day: string; deliverable: string; phaseColor: string }[] = [];
    for (const wk of ALL_WEEKS) {
      for (let di = 0; di < wk.days.length; di++) {
        const day = wk.days[di];
        if (day.deliverable) {
          const key = `w${wk.w}_d${di}`;
          const status = dayProgress[key]?.status;
          if (status !== "done") {
            const phase = getPhaseForWeek(wk.w);
            items.push({
              week: wk.w,
              day: day.d,
              deliverable: day.deliverable,
              phaseColor: phase?.color || "#378ADD",
            });
            if (items.length >= 5) break;
          }
        }
      }
      if (items.length >= 5) break;
    }
    return items;
  }, [dayProgress]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold">Upcoming Deliverables</h3>
      </div>
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">🎉 All deliverables complete!</p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/3 hover:bg-white/5 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.phaseColor }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{item.deliverable}</p>
                <p className="text-[10px] text-muted-foreground">
                  Week {item.week} · {item.day}
                </p>
              </div>
              <Link
                href={`/planner?week=${item.week}`}
                className="flex-shrink-0"
              >
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Weekly activity chart ────────────────────────────────────────────────────
function ActivityChart({ dayProgress }: { dayProgress: Record<string, { status: string | null }> }) {
  const chartData = useMemo(() => {
    return ALL_WEEKS.slice(0, 20).map((wk) => {
      let done = 0;
      let skipped = 0;
      for (let di = 0; di < wk.days.length; di++) {
        const key = `w${wk.w}_d${di}`;
        const s = dayProgress[key]?.status;
        if (s === "done") done++;
        if (s === "skipped") skipped++;
      }
      return { week: `W${wk.w}`, done, skipped };
    });
  }, [dayProgress]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold">Weekly Activity (Weeks 1–20)</h3>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id="doneGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#378ADD" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} interval={3} />
          <YAxis tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "rgba(10,14,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
            labelStyle={{ color: "#aaa" }}
          />
          <Area type="monotone" dataKey="done" stroke="#378ADD" fill="url(#doneGrad)" strokeWidth={2} name="Days Done" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Overall radial progress ──────────────────────────────────────────────────
function OverallProgress({ pct }: { pct: number }) {
  const data = [{ value: pct, fill: "#378ADD" }];
  return (
    <div className="glass-card p-5 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-3 self-start">
        <Target className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold">Overall Progress</h3>
      </div>
      <div className="relative">
        <RadialBarChart width={140} height={140} innerRadius={45} outerRadius={65} data={data} startAngle={90} endAngle={-270}>
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "rgba(255,255,255,0.05)" }} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{pct}%</span>
          <span className="text-[10px] text-muted-foreground">Complete</span>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard page ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { dayProgress, getStats } = useRoadmapStore();
  const stats = getStats();

  // Find current active week (first incomplete week)
  const currentWeek = useMemo(() => {
    for (const wk of ALL_WEEKS) {
      const hasPending = wk.days.some((_, di) => {
        const key = `w${wk.w}_d${di}`;
        return !dayProgress[key]?.status;
      });
      if (hasPending) return wk;
    }
    return ALL_WEEKS[ALL_WEEKS.length - 1];
  }, [dayProgress]);

  const currentPhase = getPhaseForWeek(currentWeek?.w || 1);

  return (
    <AppShell>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Your DE journey · Jun 2026 – Feb 2027
            </p>
          </div>
          <div className="flex items-center gap-2">
            {currentPhase && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: `${currentPhase.color}20`, color: currentPhase.color }}
              >
                {currentPhase.label}
              </span>
            )}
            <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground font-medium">
              Week {currentWeek?.w} of 39
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={CheckCircle2} label="Days Done" value={stats.totalDone} sub={`of ${stats.totalRequired}`} color="#10B981" delay={0} />
        <StatCard icon={Flame} label="Current Streak" value={`${stats.currentStreak}d`} sub={`Best: ${stats.longestStreak}d`} color="#F97316" delay={0.05} />
        <StatCard icon={Clock} label="Study Hours" value={`${stats.totalStudyHours}h`} sub="Total logged" color="#8B5CF6" delay={0.1} />
        <StatCard icon={SkipForward} label="Skipped" value={stats.totalSkipped} sub="Days skipped" color="#EAB308" delay={0.15} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Overall progress radial */}
        <OverallProgress pct={stats.completionPct} />

        {/* Phase completion bars */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold">Phase Completion</h3>
          </div>
          <div className="space-y-2.5">
            {PHASES.map((phase, i) => (
              <PhaseBar
                key={phase.id}
                phase={phase}
                pct={stats.phaseProgress[phase.id]?.pct || 0}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Charts + deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ActivityChart dayProgress={dayProgress} />
        <UpcomingDeliverables dayProgress={dayProgress} />
      </div>

      {/* Projects strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <GitCommit className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold">Projects by Phase</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {PHASES.map((phase) => {
            const prog = stats.phaseProgress[phase.id];
            const done = prog?.pct === 100;
            return (
              <Link
                key={phase.id}
                href={`/planner?phase=${phase.id}`}
                className={cn(
                  "p-3 rounded-xl border text-center transition-all hover:scale-105",
                  done ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/3 border-white/5 hover:bg-white/5"
                )}
              >
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-1.5"
                  style={{ background: phase.color }}
                />
                <p className="text-[10px] text-muted-foreground truncate leading-tight">{phase.project}</p>
                <p className="text-[10px] font-bold mt-0.5" style={{ color: phase.color }}>
                  {prog?.pct || 0}%
                </p>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Quick nav */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { href: "/planner", label: "Open Planner", icon: BarChart2, desc: "Track daily tasks" },
          { href: "/analytics", label: "View Analytics", icon: Trophy, desc: "Study charts & streaks" },
          { href: "/calendar", label: "Calendar", icon: Calendar, desc: "Deadlines & milestones" },
        ].map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 p-4 glass-card-sm hover:bg-white/8 transition-all hover:scale-[1.02] group"
            >
              <div className="p-2 rounded-lg bg-blue-500/10">
                <item.icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-blue-300 transition-colors">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
