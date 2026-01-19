import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  onChange: (order: "asc" | "desc") => void;
  disabled?: boolean;
}

export const SortButton = ({
  sortOrder,
  onChange,
  disabled = false,
}: SortButtonProps) => {
  const handleClick = () => {
    onChange(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      className="gap-2"
    >
      {sortOrder === "desc" ? (
        <ArrowUpAZ className="h-4 w-4" />
      ) : (
        <ArrowDownAZ className="h-4 w-4" />
      )}
      Sort by Name
    </Button>
  );
};
