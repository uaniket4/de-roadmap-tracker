"use client";

import { Sidebar, MobileHeader } from "@/components/layout/sidebar";
import { useRoadmapStore } from "@/store/roadmap-store";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useRoadmapStore();
  return (
    <div className="min-h-screen gradient-mesh">
      <Sidebar />
      <MobileHeader />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarOpen ? "lg:ml-60" : "lg:ml-[72px]",
          "pt-14 lg:pt-0"
        )}
      >
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
