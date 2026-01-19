import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role } from "@/types";

interface RoleFilterProps {
  value: Role | "";
  onChange: (value: Role | "") => void;
}

export const RoleFilter = ({ value, onChange }: RoleFilterProps) => {
  const handleChange = (v: string) => {
    onChange(v === "all" ? "" : (v as Role));
  };

  return (
    <Select value={value || "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="All Roles" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
};
