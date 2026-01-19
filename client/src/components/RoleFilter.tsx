import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import type { Role } from "@/types";

interface RoleFilterProps {
  value: Role | "";
  onChange: (value: Role | "") => void;
}

export function RoleFilter({ value, onChange }: RoleFilterProps) {
  const handleChange = (v: string) => {
    onChange(v === "all" ? "" : (v as Role));
  };

  return (
    <Select value={value || "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-full h-10! border-border/50 bg-card/50 hover:border-[oklch(0.52_0.14_55/20%)] transition-colors">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <SelectValue placeholder="All Roles" />
        </div>
      </SelectTrigger>
      <SelectContent className="border-border/50">
        <SelectItem value="all">All Roles</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
}
