"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, BarChart3, Calendar, Link2,
  Settings, ChevronLeft, Menu, Flame, Trophy, Sun, Moon,
  Target, Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRoadmapStore } from "@/store/roadmap-store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/planner", icon: BookOpen, label: "Planner" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/resources", icon: Link2, label: "Resources" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { sidebarOpen, setSidebarOpen, getStats } = useRoadmapStore();
  const stats = getStats();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-full z-50 flex flex-col",
          "bg-[#0a0e1a]/95 backdrop-blur-xl border-r border-white/5",
          "shadow-2xl"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-white/5">
          <motion.div
            animate={{ opacity: sidebarOpen ? 1 : 0, width: sidebarOpen ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <span className="text-sm font-bold text-gradient whitespace-nowrap pr-2">
              DE Roadmap
            </span>
          </motion.div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        {/* XP / Streak strip */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-orange-300">{stats.currentStreak}d</span>
              </div>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all"
                  style={{ width: `${Math.min(stats.completionPct, 100)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{stats.completionPct}%</span>
            </div>
          </motion.div>
        )}

        {/* Nav links */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-blue-500/20 text-blue-300 shadow-sm"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-4 h-4 flex-shrink-0", active && "text-blue-400")} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 w-0.5 h-6 bg-blue-400 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {/* Stats mini */}
          {sidebarOpen && (
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-white/5 text-center">
                <Target className="w-3 h-3 text-emerald-400 mb-0.5" />
                <span className="text-xs font-bold text-emerald-300">{stats.totalDone}</span>
                <span className="text-[9px] text-muted-foreground">Done</span>
              </div>
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-white/5 text-center">
                <Trophy className="w-3 h-3 text-amber-400 mb-0.5" />
                <span className="text-xs font-bold text-amber-300">{stats.longestStreak}</span>
                <span className="text-[9px] text-muted-foreground">Best</span>
              </div>
              <div className="flex flex-col items-center p-1.5 rounded-lg bg-white/5 text-center">
                <Zap className="w-3 h-3 text-blue-400 mb-0.5" />
                <span className="text-xs font-bold text-blue-300">{Math.round(stats.totalStudyHours)}h</span>
                <span className="text-[9px] text-muted-foreground">Hours</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {sidebarOpen && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export function MobileHeader() {
  const { setSidebarOpen } = useRoadmapStore();
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 gap-3 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 z-40">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>
      <span className="text-sm font-bold text-gradient">DE Roadmap</span>
    </header>
  );
}
