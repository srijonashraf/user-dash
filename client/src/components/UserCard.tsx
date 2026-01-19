import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

const roleBadgeVariants: Record<User["role"], string> = {
  admin: "bg-red-100 text-red-800 hover:bg-red-100",
  editor: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  viewer: "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

export const UserCard = ({ user, isSelected, onClick }: UserCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent",
        isSelected && "border-primary bg-accent",
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{user.name}</span>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={roleBadgeVariants[user.role]}>
            {user.role}
          </Badge>
          <span
            className={cn(
              "text-xs",
              user.active ? "text-green-600" : "text-muted-foreground",
            )}
          >
            {user.active ? "active" : "inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};
