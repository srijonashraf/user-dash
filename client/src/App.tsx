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
    // Clear selection when searching
    if (value !== selectedUserId) {
      setSelectedUserId(null);
    }
  }, []);

  const handleRoleChange = useCallback((value: Role | "") => {
    setRole(value);
    setSelectedUserId(null);
  }, []);

  const handleSortChange = useCallback((order: "asc" | "desc") => {
    setSortOrder(order);
  }, []);

  const handleSelectUser = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  // Format user count for display
  const userCount = users?.length ?? 0;
  const isFiltering = search || role;

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "oklch(0.52 0.14 55 / 15%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "oklch(0.60 0.18 25 / 12%)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-col gap-2">
            <h1 className="text-display-lg text-foreground">User Dashboard</h1>
            <p className="text-muted-foreground text-body">
              Manage and view user information across your organization
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[oklch(0.52_0.14_55)]" />
              <span className="text-muted-foreground">
                {isFiltering ? (
                  <>
                    Showing{" "}
                    <strong className="text-foreground">{userCount}</strong> of
                    users
                  </>
                ) : (
                  <>
                    <strong className="text-foreground">{userCount}</strong>{" "}
                    total users
                  </>
                )}
              </span>
            </div>
          </div>
        </header>

        {/* Control Bar - Search, Filter, Sort */}
        <div className="mb-6 animate-fade-in delay-100">
          <div className="glass-card rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {/* Search - takes available space */}
              <div className="min-w-[200px] flex-1 md:min-w-[280px]">
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Search
                </label>
                <SearchInput
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by name..."
                />
              </div>

              {/* Role Filter */}
              <div className="w-full sm:w-auto sm:min-w-[160px]">
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Role
                </label>
                <RoleFilter value={role} onChange={handleRoleChange} />
              </div>

              {/* Sort */}
              <div className="w-full sm:w-auto sm:self-end">
                <SortButton
                  sortOrder={sortOrder}
                  onChange={handleSortChange}
                  disabled={isFetching}
                />
              </div>

              {/* Clear filters button */}
              {isFiltering && (
                <div className="w-full sm:w-auto sm:mt-5">
                  <button
                    onClick={() => {
                      setSearch("");
                      setRole("");
                      setSelectedUserId(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-dashed underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left Panel - Users List */}
          <div className="animate-fade-in delay-200">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">All Users</h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                  {userCount} {userCount === 1 ? "user" : "users"}
                </span>
              </div>
              <div className="p-4">
                <UserList
                  users={users}
                  isLoading={isLoading}
                  selectedUserId={selectedUserId}
                  onSelectUser={handleSelectUser}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - User Details */}
          <div className="animate-fade-in delay-300 lg:sticky lg:top-8 lg:self-start">
            <UserDetails userId={selectedUserId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
