"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sun, Moon, Monitor, Palette, Download, Upload,
  AlertTriangle, RotateCcw, Check, Info,
} from "lucide-react";
import { useTheme } from "next-themes";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore } from "@/store/roadmap-store";
import { showToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  { id: "blue", label: "Ocean Blue", color: "#378ADD" },
  { id: "violet", label: "Deep Violet", color: "#7F77DD" },
  { id: "emerald", label: "Emerald", color: "#10B981" },
  { id: "orange", label: "Orange", color: "#F97316" },
  { id: "rose", label: "Rose", color: "#F43F5E" },
] as const;

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings, resetProgress, exportData, importData, getStats } = useRoadmapStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stats = getStats();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `de-roadmap-progress-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Progress exported!", "success");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const json = ev.target?.result as string;
      const ok = importData(json);
      if (ok) showToast("Progress imported successfully!", "success");
      else showToast("Invalid file format", "error");
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    showToast("Progress has been reset", "warning");
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Customize your experience</p>
      </div>

      <div className="max-w-2xl space-y-4">
        {/* Theme */}
        <SettingSection title="Appearance">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Theme</p>
              <div className="flex gap-2">
                {([
                  { value: "light", icon: Sun, label: "Light" },
                  { value: "dark", icon: Moon, label: "Dark" },
                  { value: "system", icon: Monitor, label: "System" },
                ] as const).map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex-1 justify-center",
                      theme === t.value
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/8"
                    )}
                  >
                    <t.icon className="w-4 h-4" />
                    {t.label}
                    {theme === t.value && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Accent Color</p>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateSettings({ accentColor: c.id })}
                    title={c.label}
                    className={cn(
                      "w-9 h-9 rounded-xl border-2 transition-all hover:scale-110",
                      settings.accentColor === c.id
                        ? "border-white/70 scale-110"
                        : "border-transparent"
                    )}
                    style={{ background: c.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </SettingSection>

        {/* Data management */}
        <SettingSection title="Data Management">
          <div className="space-y-3">
            {/* Stats summary */}
            <div className="p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-medium text-muted-foreground">Current progress</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-lg font-bold">{stats.totalDone}</p>
                  <p className="text-[10px] text-muted-foreground">Days done</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{stats.completionPct}%</p>
                  <p className="text-[10px] text-muted-foreground">Complete</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{stats.currentStreak}d</p>
                  <p className="text-[10px] text-muted-foreground">Streak</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export Progress
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/20 transition-colors text-sm font-medium"
              >
                <Upload className="w-4 h-4" />
                Import Progress
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </div>
        </SettingSection>

        {/* Danger zone */}
        <SettingSection title="Danger Zone">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/15 transition-colors text-sm font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Progress
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/25"
            >
              <div className="flex items-start gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-300">Are you sure?</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This will permanently erase all {stats.totalDone} days of progress, notes, and resources.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Yes, reset everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-muted-foreground text-sm hover:bg-white/15 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </SettingSection>

        {/* About */}
        <SettingSection title="About">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="text-foreground font-medium">DE Roadmap Tracker</span> v1.0</p>
            <p>9-Month Data Engineering Journey · Jun 2026 – Feb 2027</p>
            <p>39 Weeks · 8 Phases · 5 Projects</p>
            <p className="mt-2 text-[10px]">Progress is stored locally in your browser. No data is sent to any server.</p>
          </div>
        </SettingSection>
      </div>
    </AppShell>
  );
}
