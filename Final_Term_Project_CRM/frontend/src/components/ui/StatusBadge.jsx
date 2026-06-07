import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  Lead: "bg-amber-500/15 text-amber-700 border-amber-500/20 dark:text-amber-300",
  Active: "bg-teal-500/15 text-teal-700 border-teal-500/20 dark:text-teal-300",
  Inactive: "bg-stone-500/15 text-stone-600 border-stone-500/20 dark:text-stone-400",
  New: "bg-sky-500/15 text-sky-700 border-sky-500/20 dark:text-sky-300",
  Contacted: "bg-violet-500/15 text-violet-700 border-violet-500/20 dark:text-violet-300",
  Converted: "bg-teal-500/15 text-teal-700 border-teal-500/20 dark:text-teal-300",
  Lost: "bg-rose-500/15 text-rose-700 border-rose-500/20 dark:text-rose-300",
};

export function StatusBadge({ status, className }) {
  const label = status || "Lead";
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
        STATUS_STYLES[label] || STATUS_STYLES.Lead,
        className
      )}
    >
      {label}
    </Badge>
  );
}
