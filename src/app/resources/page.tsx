"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, Plus, Trash2, ExternalLink, Video, FileText,
  BookOpen, Github, Search, X, Tag,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { useRoadmapStore, type Resource } from "@/store/roadmap-store";
import { showToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

const TYPE_OPTIONS = [
  { value: "video", label: "Video", icon: Video, color: "#EF4444" },
  { value: "doc", label: "Doc", icon: FileText, color: "#3B82F6" },
  { value: "article", label: "Article", icon: BookOpen, color: "#10B981" },
  { value: "github", label: "GitHub", icon: Github, color: "#8B5CF6" },
  { value: "link", label: "Link", icon: Link2, color: "#F59E0B" },
] as const;

type ResourceType = typeof TYPE_OPTIONS[number]["value"];

function TypeIcon({ type, className }: { type: ResourceType; className?: string }) {
  const t = TYPE_OPTIONS.find((x) => x.value === type);
  if (!t) return null;
  return <t.icon className={className} style={{ color: t.color }} />;
}

function ResourceCard({ resource, onDelete }: { resource: Resource; onDelete: () => void }) {
  const typeInfo = TYPE_OPTIONS.find((t) => t.value === resource.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="glass-card-sm p-4 group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${typeInfo?.color}15` }}>
          <TypeIcon type={resource.type} className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1.5 group/link"
            >
              <span className="truncate">{resource.title}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
            </a>
            <button
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-500/15 text-muted-foreground hover:text-red-400 flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">{resource.url}</p>
          {resource.notes && (
            <p className="text-xs text-muted-foreground mt-1.5 italic">{resource.notes}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${typeInfo?.color}15`, color: typeInfo?.color }}
            >
              {typeInfo?.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {new Date(resource.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AddResourceModal({ onClose }: { onClose: () => void }) {
  const { addResource } = useRoadmapStore();
  const [form, setForm] = useState({
    title: "",
    url: "",
    type: "link" as ResourceType,
    notes: "",
  });

  const save = () => {
    if (!form.title.trim() || !form.url.trim()) {
      showToast("Title and URL are required", "error");
      return;
    }
    addResource(form);
    showToast("Resource saved!", "success");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold">Add Resource</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Airflow Documentation"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">URL *</label>
            <input
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Type</label>
            <div className="flex gap-1.5 flex-wrap">
              {TYPE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                  className={cn(
                    "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all",
                    form.type === t.value
                      ? "text-white border-transparent"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/8"
                  )}
                  style={form.type === t.value ? { background: t.color } : {}}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder="Why is this useful?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 resize-none"
            />
          </div>
          <button
            onClick={save}
            className="w-full py-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-sm font-medium"
          >
            Save Resource
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ResourcesPage() {
  const { resources, removeResource } = useRoadmapStore();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<ResourceType | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    if (filter !== "all" && r.type !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return r.title.toLowerCase().includes(q) || r.url.toLowerCase().includes(q) || r.notes?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Save and organize your learning materials</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-sm font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Resource
        </button>
      </div>

      {/* Type filter */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "text-xs px-3 py-1.5 rounded-xl border font-medium transition-all",
            filter === "all"
              ? "bg-white/15 text-foreground border-white/20"
              : "bg-white/3 border-white/8 text-muted-foreground hover:bg-white/5"
          )}
        >
          All ({resources.length})
        </button>
        {TYPE_OPTIONS.map((t) => {
          const count = resources.filter((r) => r.type === t.value).length;
          return (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={cn(
                "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border font-medium transition-all",
                filter === t.value
                  ? "text-white border-transparent"
                  : "bg-white/3 border-white/8 text-muted-foreground hover:bg-white/5"
              )}
              style={filter === t.value ? { background: t.color } : {}}
            >
              <t.icon className="w-3 h-3" />
              {t.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Resources grid */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Link2 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            {resources.length === 0 ? "No resources yet — add your first one!" : "No resources match your filter"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((r) => (
              <ResourceCard
                key={r.id}
                resource={r}
                onDelete={() => {
                  removeResource(r.id);
                  showToast("Resource removed", "info");
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showModal && <AddResourceModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </AppShell>
  );
}
