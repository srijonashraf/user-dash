import { useState, useCallback } from "react";
import { SearchInput } from "@/components/SearchInput";
import { RoleFilter } from "@/components/RoleFilter";
import { SortButton } from "@/components/SortButton";
import { UserList } from "@/components/UserList";
import { UserDetails } from "@/components/UserDetails";
import { useUsers } from "@/hooks/useUsers";
import type { Role } from "@/types";

function App() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<Role | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const {
    data: users,
    isLoading,
    isFetching,
  } = useUsers({
    search: search || undefined,
    role: role || undefined,
    sortOrder: sortOrder || undefined,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleRoleChange = useCallback((value: Role | "") => {
    setRole(value);
  }, []);

  const handleSortChange = useCallback((order: "asc" | "desc") => {
    setSortOrder(order);
  }, []);

  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-6 text-3xl font-bold">User Dashboard</h1>

        {/* Top Bar - Search, Filter, Sort */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="min-w-[250px] flex-1">
            <SearchInput value={search} onChange={handleSearchChange} />
          </div>
          <RoleFilter value={role} onChange={handleRoleChange} />
          <SortButton
            sortOrder={sortOrder}
            onChange={handleSortChange}
            disabled={isFetching}
          />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left Panel - Users List */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-4 text-lg font-semibold">Users</h2>
            <UserList
              users={users}
              isLoading={isLoading}
              selectedUserId={selectedUserId}
              onSelectUser={handleSelectUser}
            />
          </div>

          {/* Right Panel - User Details */}
          <div>
            <UserDetails userId={selectedUserId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
