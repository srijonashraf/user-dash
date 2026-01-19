import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserDetailsSkeleton } from "@/components/UserDetailsSkeleton";
import { ActivityIndicator } from "@/components/ActivityIndicator";
import { useUser } from "@/hooks/useUser";
import { useToggleActive } from "@/hooks/useToggleActive";
import { cn } from "@/lib/utils";
import { Mail, Calendar, User as UserIcon, X } from "lucide-react";

interface UserDetailsProps {
  userId: string | null;
}

const roleBadgeConfig: Record<
  string,
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

export function UserDetails({ userId }: UserDetailsProps) {
  const { data: user, isLoading } = useUser(userId);
  const toggleActive = useToggleActive();

  // Empty state - no user selected
  if (!userId) {
    return (
      <Card className="glass-card">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <UserIcon className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            No User Selected
          </h3>
          <p className="text-sm text-muted-foreground max-w-[240px]">
            Select a user from the list to view their details and manage their
            account
          </p>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading) {
    return <UserDetailsSkeleton />;
  }

  // User not found state
  if (!user) {
    return (
      <Card className="glass-card">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <X className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">User Not Found</h3>
          <p className="text-sm text-muted-foreground">
            The requested user could not be loaded
          </p>
        </CardContent>
      </Card>
    );
  }

  const roleConfig = roleBadgeConfig[user.role];
  const handleToggle = () => toggleActive.mutate(user.id);

  return (
    <Card className="glass-elevated overflow-hidden animate-fade-in-right">
      {/* Header with avatar */}
      <div className="relative bg-linear-to-br from-[oklch(0.52_0.14_55/8%)] to-[oklch(0.52_0.14_55/3%)] px-6 pt-8 pb-6">
        <div className="flex items-start gap-4">
          {/* Large avatar */}
          <div className="w-16 h-16 rounded-2xl bg-[oklch(0.52_0.14_55)] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Name and role */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground truncate">
              {user.name}
            </h2>
            <div className="mt-2">
              <Badge
                variant="outline"
                className="text-sm px-2.5 py-1"
                style={{
                  backgroundColor: roleConfig.bg,
                  color: roleConfig.text,
                  borderColor: roleConfig.border,
                }}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 space-y-6">
        {/* Status toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
          <div>
            <p className="text-sm font-medium text-foreground">
              Account Status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                user.active
                  ? "text-[oklch(0.55_0.14_145)]"
                  : "text-muted-foreground",
              )}
            >
              {user.active ? "Active" : "Inactive"}
            </span>
            <Switch
              checked={user.active}
              onCheckedChange={handleToggle}
              disabled={toggleActive.isPending}
              aria-label={user.active ? "Deactivate user" : "Activate user"}
            />
          </div>
        </div>

        {/* Info fields */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">
                Email Address
              </p>
              <p className="text-sm font-medium text-foreground break-all">
                {user.email}
              </p>
            </div>
          </div>

          {/* Created date */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">
                Member Since
              </p>
              <p className="text-sm font-medium text-foreground">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Activity indicator */}
        <div className="pt-4 border-t border-border/50">
          <ActivityIndicator userId={userId} />
        </div>
      </CardContent>
    </Card>
  );
}
