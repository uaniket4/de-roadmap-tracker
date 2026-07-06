// Server component — handles generateStaticParams + passes weekNum to the client component
import { ALL_WEEKS } from "@/data/roadmap-data";
import { WeekDetailClient } from "./week-detail-client";

// Pre-generate all 39 week pages at build time (required for static export)
export function generateStaticParams() {
  return ALL_WEEKS.map((w) => ({ weekNum: String(w.w) }));
}

export default function WeekDetailPage({ params }: { params: { weekNum: string } }) {
  return <WeekDetailClient weekNum={parseInt(params.weekNum)} />;
}
