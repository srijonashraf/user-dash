import { UserCard } from "@/components/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox } from "lucide-react";
import type { User } from "@/types";

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function UserList({
  users,
  isLoading,
  selectedUserId,
  onSelectUser,
}: UserListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 w-full rounded-lg animate-shimmer"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
          <Inbox className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">No users found</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {users.map((user, index) => (
        <div
          key={user.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <UserCard
            user={user}
            isSelected={user.id === selectedUserId}
            onClick={() => onSelectUser(user.id)}
          />
        </div>
      ))}
    </div>
  );
}
