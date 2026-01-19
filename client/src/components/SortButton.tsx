import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onChange: (order: "asc" | "desc") => void;
  disabled?: boolean;
}

export function SortButton({
  sortOrder,
  onChange,
  disabled = false,
}: SortButtonProps) {
  const handleClick = () => {
    onChange(sortOrder === "desc" ? "asc" : "desc");
  };

  const isAscending = sortOrder === "asc";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "h-10 gap-2 border-border/50 bg-card/50 hover:bg-[oklch(0.52_0.14_55/8%)] hover:border-[oklch(0.52_0.14_55/30%)] transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
      aria-label={`Sort by name (${isAscending ? "ascending" : "descending"})`}
    >
      {isAscending ? (
        <ArrowUpAZ className="h-4 w-4" />
      ) : (
        <ArrowDownAZ className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">Name</span>
    </Button>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
