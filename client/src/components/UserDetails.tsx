import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { UserDetailsSkeleton } from "@/components/UserDetailsSkeleton";
import { ActivityIndicator } from "@/components/ActivityIndicator";
import { useUser } from "@/hooks/useUser";
import { useToggleActive } from "@/hooks/useToggleActive";
import { cn } from "@/lib/utils";

interface UserDetailsProps {
  userId: string | null;
}

const roleBadgeVariants: Record<string, string> = {
  admin: "bg-red-100 text-red-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-gray-100 text-gray-800",
};

export const UserDetails = ({ userId }: UserDetailsProps) => {
  const { data: user, isLoading } = useUser(userId);
  const toggleActive = useToggleActive();

  if (!userId) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
          Select a user to view details
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
          User not found
        </CardContent>
      </Card>
    );
  }

  const handleToggle = () => {
    toggleActive.mutate(user.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <Badge variant="outline" className={roleBadgeVariants[user.role]}>
            {user.role}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <div className="flex items-center gap-3 mt-1">
            <Switch checked={user.active} onCheckedChange={handleToggle} />
            <span
              className={cn(
                "font-medium",
                user.active ? "text-green-600" : "text-muted-foreground",
              )}
            >
              {user.active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Created At</p>
          <p className="font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <ActivityIndicator userId={userId} />
      </CardContent>
    </Card>
  );
};
