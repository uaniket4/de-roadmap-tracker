"use client";

import { useState } from "react";
import { Bot, CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import { ALL_WEEKS, getPhaseForWeek, type Day } from "@/data/roadmap-data";
import { createLocalAIClient, buildDailyGuidePrompt, describeLocalAIError } from "@/lib/local-ai";
import { DEFAULT_LOCAL_AI_CONFIG, useRoadmapStore } from "@/store/roadmap-store";
import { cn } from "@/lib/utils";

function GuideContent({ text }: { text: string }) {
  return <div className="space-y-3 text-sm leading-6 text-muted-foreground">{text.split("\n").map((line, index) => {
    if (line.startsWith("## ")) return <h3 key={index} className="pt-3 text-sm font-bold uppercase tracking-wider text-foreground">{line.slice(3)}</h3>;
    if (line.startsWith("### ")) return <h4 key={index} className="pt-2 font-semibold text-blue-200">{line.slice(4)}</h4>;
    if (!line.trim()) return <div key={index} className="h-1" />;
    return <p key={index} className={cn(line.startsWith("- ") || /^\d+\./.test(line) ? "pl-3" : "")}>{line}</p>;
  })}</div>;
}

export function AIGuideButton({ weekNum, dayIndex, day, compact = false }: { weekNum: number; dayIndex: number; day: Day; compact?: boolean }) {
  const { settings, getDayProgress } = useRoadmapStore();
  const localAI = settings.localAI || DEFAULT_LOCAL_AI_CONFIG;
  const [open, setOpen] = useState(false);
  const [guide, setGuide] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const phase = getPhaseForWeek(weekNum);
  const generate = async () => {
    setOpen(true);
    setError("");
    if (guide) return;
    setLoading(true);
    try {
      const progress = getDayProgress(weekNum, dayIndex);
      const text = await createLocalAIClient(localAI).generate(
        buildDailyGuidePrompt(ALL_WEEKS[weekNum - 1], day, phase, progress.notes || "")
      );
      setGuide(text);
    } catch (cause) {
      setError(describeLocalAIError(cause, localAI));
    } finally {
      setLoading(false);
    }
  };
  return <>
    <button onClick={generate} className={cn("flex items-center justify-center gap-1.5 rounded-lg border border-violet-400/25 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20", compact ? "px-2.5 py-1.5 text-[11px]" : "px-3 py-2 text-xs font-semibold")}><Bot className="h-3.5 w-3.5" /> Open AI guide</button>
    {open && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Local AI guide">
      <div className="glass-card flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 p-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">AI mentor</p><h2 className="mt-1 text-lg font-bold">{day.title}</h2><p className="text-xs text-muted-foreground">Local model · {localAI.model}</p></div><button onClick={() => setOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-white/10" aria-label="Close guide"><X className="h-4 w-4" /></button></div>
        <div className="overflow-y-auto p-5 sm:p-7">{loading ? <div className="flex items-center gap-3 py-12 text-sm text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin text-violet-300" /> Building a step-by-step plan from this roadmap day…</div> : error ? <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">{error}<button onClick={() => { setGuide(""); generate(); }} className="mt-3 block rounded-lg border border-red-300/20 px-3 py-1.5 text-xs">Try again</button></div> : <GuideContent text={guide} />}</div>
        {!loading && !error && guide && <div className="flex flex-wrap gap-2 border-t border-white/10 p-4"><button className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" /> Mark guide step complete</button><button className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-muted-foreground"><MessageCircle className="h-3.5 w-3.5" /> Ask for a hint</button></div>}
      </div>
    </div>}
  </>;
}

export function AIStatus() {
  const { settings } = useRoadmapStore();
  const localAI = settings.localAI || DEFAULT_LOCAL_AI_CONFIG;
  const [status, setStatus] = useState<"unknown" | "checking" | "connected" | "offline">("unknown");
  const check = async () => { setStatus("checking"); setStatus(await createLocalAIClient(localAI).healthCheck() ? "connected" : "offline"); };
  return <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><div><p className="text-sm font-medium">Local AI</p><p className="text-xs text-muted-foreground">{status === "connected" ? "Connected" : status === "offline" ? "Unavailable" : "Not checked"} · {localAI.model}</p></div><button onClick={check} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/10">{status === "checking" ? "Checking…" : "Test connection"}</button></div>;
}
