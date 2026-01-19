import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search user...",
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue);

  // Notify parent when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  // Sync with external value changes (e.g., when filter is cleared)
  useEffect(() => {
    if (value !== localValue && value !== debouncedValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[oklch(0.52_0.14_55)]" />
      <Input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-10 pl-10 pr-10 transition-all duration-200",
          "border-border/50 bg-card/50",
          "focus:border-[oklch(0.52_0.14_55/40%)] focus:ring-2 focus:ring-[oklch(0.52_0.14_55/15%)]",
        )}
      />
      {localValue && (
        <Button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground bg-transparent!"
          aria-label="Clear search"
          type="button"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
