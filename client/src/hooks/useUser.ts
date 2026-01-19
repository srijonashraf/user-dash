import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/api/users";
import type { User } from "@/types";

export const useUser = (id: string | null) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
