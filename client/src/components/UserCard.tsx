import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

const roleBadgeConfig: Record<
  User["role"],
  { bg: string; text: string; border: string }
> = {
  admin: {
    bg: "oklch(0.60 0.18 25 / 12%)",
    text: "oklch(0.55 0.16 25)",
    border: "oklch(0.60 0.18 25 / 25%)",
  },
  editor: {
    bg: "oklch(0.55 0.16 240 / 12%)",
    text: "oklch(0.50 0.14 240)",
    border: "oklch(0.55 0.16 240 / 25%)",
  },
  viewer: {
    bg: "oklch(0.45 0.01 50 / 8%)",
    text: "oklch(0.40 0.01 50)",
    border: "oklch(0.45 0.01 50 / 20%)",
  },
};

export const UserCard = memo(function UserCard({
  user,
  isSelected,
  onClick,
}: UserCardProps) {
  const roleConfig = roleBadgeConfig[user.role];

  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles
        "w-full text-left rounded-lg p-4 transition-all duration-200",
        "border",
        // Default state
        !isSelected &&
          "bg-card border-border/50 hover:border-[oklch(0.52_0.14_55/30%)] hover:shadow-sm",
        // Selected state
        isSelected &&
          "bg-[oklch(0.52_0.14_55/8%)] border-[oklch(0.52_0.14_55/30%)] shadow-sm",
        // Focus ring for accessibility
        "focus:outline-none focus:ring-2 focus:ring-[oklch(0.52_0.14_55/40%)] focus:ring-offset-2",
      )}
      aria-pressed={isSelected}
      aria-label={`View details for ${user.name}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* User info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Avatar placeholder */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors",
              isSelected
                ? "bg-[oklch(0.52_0.14_55)] text-white"
                : "bg-secondary text-foreground",
            )}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Name and role */}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate">{user.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                variant="outline"
                className="text-xs px-1.5 py-0.5 font-normal"
                style={{
                  backgroundColor: roleConfig.bg,
                  color: roleConfig.text,
                  borderColor: roleConfig.border,
                }}
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs",
              user.active
                ? "text-[oklch(0.55_0.14_145)]"
                : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                user.active
                  ? "bg-[oklch(0.55_0.14_145)] animate-pulse-subtle"
                  : "bg-muted-foreground/50",
              )}
            />
            <span className="hidden sm:inline">
              {user.active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Selection indicator */}
          {isSelected && (
            <div className="w-5 h-5 rounded-full bg-[oklch(0.52_0.14_55)] flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
});
