import { UserCard } from "@/components/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types";

interface UserListProps {
  users: User[] | undefined;
  isLoading: boolean;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export const UserList = ({
  users,
  isLoading,
  selectedUserId,
  onSelectUser,
}: UserListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isSelected={user.id === selectedUserId}
          onClick={() => onSelectUser(user.id)}
        />
      ))}
    </div>
  );
};
