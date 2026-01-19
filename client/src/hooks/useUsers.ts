import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users";
import type { User, UserQueryParams } from "@/types";

export const useUsers = (params: UserQueryParams) => {
  return useQuery<User[]>({
    queryKey: ["users", params],
    queryFn: ({ signal }) => fetchUsers(params, signal),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
  });
};
