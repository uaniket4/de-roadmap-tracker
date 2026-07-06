"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import { Flame, Trophy, Target, Clock, BarChart3, Zap, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore } from "@/store/roadmap-store";
import { PHASES, ALL_WEEKS } from "@/data/roadmap-data";
import { cn } from "@/lib/utils";

// ─── Contribution heatmap ──────────────────────────────────────────────────────
function ContributionHeatmap({ dayProgress }: { dayProgress: Record<string, { status: string | null }> }) {
  const cells = useMemo(() => {
    return ALL_WEEKS.flatMap((wk) =>
      wk.days.map((_, di) => {
        const key = `w${wk.w}_d${di}`;
        const s = dayProgress[key]?.status || null;
        return { week: wk.w, day: di, status: s };
      })
    );
  }, [dayProgress]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold">Activity Heatmap — All 39 Weeks</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-0.5 min-w-max">
          {ALL_WEEKS.map((wk) => (
            <div key={wk.w} className="flex flex-col gap-0.5">
              {wk.days.map((_, di) => {
                const key = `w${wk.w}_d${di}`;
                const s = dayProgress[key]?.status || null;
                return (
                  <div
                    key={di}
                    title={`W${wk.w} ${wk.days[di].d}: ${s || "pending"}`}
                    className={cn(
                      "w-3 h-3 rounded-sm transition-colors",
                      s === "done" ? "bg-emerald-500" : s === "skipped" ? "bg-amber-500/60" : "bg-white/5"
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-white/5" />
          <span className="text-[10px] text-muted-foreground">Pending</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 ml-2" />
          <span className="text-[10px] text-muted-foreground">Done</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-amber-500/60 ml-2" />
          <span className="text-[10px] text-muted-foreground">Skipped</span>
        </div>
      </div>
    </div>
  );
}

// ─── Phase pie chart ──────────────────────────────────────────────────────────
function PhasePieChart({ phaseProgress }: { phaseProgress: Record<string, { done: number; total: number; pct: number }> }) {
  const data = PHASES.map((p) => ({
    name: p.label.replace("Phase ", "Ph "),
    value: phaseProgress[p.id]?.done || 0,
    color: p.color,
    total: phaseProgress[p.id]?.total || 0,
  })).filter((d) => d.total > 0);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-4 h-4 text-violet-400" />
        <h3 className="text-sm font-semibold">Phase Breakdown</h3>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie data={data} innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "rgba(10,14,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-1.5">
          {data.slice(0, 8).map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-[10px] text-muted-foreground truncate flex-1">{d.name}</span>
              <span className="text-[10px] font-medium" style={{ color: d.color }}>{d.value}/{d.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Weekly completion bar chart ──────────────────────────────────────────────
function WeeklyCompletionChart({ dayProgress }: { dayProgress: Record<string, { status: string | null }> }) {
  const data = useMemo(() => {
    return ALL_WEEKS.slice(0, 30).map((wk) => {
      let done = 0, skipped = 0;
      for (let di = 0; di < wk.days.length; di++) {
        const key = `w${wk.w}_d${di}`;
        const s = dayProgress[key]?.status;
        if (s === "done") done++;
        if (s === "skipped") skipped++;
      }
      return { week: `W${wk.w}`, done, skipped, total: wk.days.length };
    });
  }, [dayProgress]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-semibold">Daily Completion by Week</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} interval={4} />
          <YAxis tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "rgba(10,14,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
          />
          <Bar dataKey="done" fill="#10B981" radius={[3, 3, 0, 0]} name="Done" />
          <Bar dataKey="skipped" fill="#F59E0B" radius={[3, 3, 0, 0]} name="Skipped" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Cumulative progress line ─────────────────────────────────────────────────
function CumulativeProgressChart({ dayProgress }: { dayProgress: Record<string, { status: string | null }> }) {
  const data = useMemo(() => {
    let cumDone = 0;
    let cumTotal = 0;
    return ALL_WEEKS.map((wk) => {
      let done = 0;
      for (let di = 0; di < wk.days.length; di++) {
        const key = `w${wk.w}_d${di}`;
        if (dayProgress[key]?.status === "done") done++;
      }
      cumDone += done;
      cumTotal += wk.days.length;
      return {
        week: `W${wk.w}`,
        cumPct: Math.round((cumDone / cumTotal) * 100),
        idealPct: Math.round(((wk.w) / 39) * 100),
      };
    });
  }, [dayProgress]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-emerald-400" />
        <h3 className="text-sm font-semibold">Cumulative Progress vs. Ideal Pace</h3>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} interval={4} />
          <YAxis tick={{ fontSize: 9, fill: "#666" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: "rgba(10,14,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
          />
          <Line type="monotone" dataKey="cumPct" stroke="#10B981" strokeWidth={2} dot={false} name="Actual %" />
          <Line type="monotone" dataKey="idealPct" stroke="#378ADD" strokeWidth={1.5} strokeDasharray="5 3" dot={false} name="Ideal %" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-emerald-400" />
          <span className="text-[10px] text-muted-foreground">Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-blue-400 border-dashed" style={{ borderTop: "1.5px dashed #378ADD" }} />
          <span className="text-[10px] text-muted-foreground">Ideal pace</span>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Page ───────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const { dayProgress, getStats } = useRoadmapStore();
  const stats = getStats();

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Deep dive into your study patterns</p>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Days Done", value: stats.totalDone, color: "#10B981", icon: Target },
          { label: "Streak", value: `${stats.currentStreak}d`, color: "#F97316", icon: Flame },
          { label: "Best Streak", value: `${stats.longestStreak}d`, color: "#8B5CF6", icon: Trophy },
          { label: "Study Hours", value: `${stats.totalStudyHours}h`, color: "#378ADD", icon: Clock },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className="p-2 rounded-lg" style={{ background: `${item.color}20` }}>
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <ContributionHeatmap dayProgress={dayProgress} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <WeeklyCompletionChart dayProgress={dayProgress} />
        <PhasePieChart phaseProgress={stats.phaseProgress} />
      </div>

      {/* Cumulative line */}
      <div className="mt-4">
        <CumulativeProgressChart dayProgress={dayProgress} />
      </div>
    </AppShell>
  );
}
