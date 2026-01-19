import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUserActive } from "@/api/users";
import type { User } from "@/types";

export const useToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleUserActive,
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: ["user", userId] });
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUser = queryClient.getQueryData<User>(["user", userId]);
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      if (previousUser) {
        queryClient.setQueryData<User>(["user", userId], {
          ...previousUser,
          active: !previousUser.active,
        });
      }

      if (previousUsers) {
        queryClient.setQueriesData<User[]>({ queryKey: ["users"] }, (old) =>
          old?.map((user) =>
            user.id === userId ? { ...user, active: !user.active } : user,
          ),
        );
      }

      return { previousUser, previousUsers };
    },
    onError: (_err, userId, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user", userId], context.previousUser);
      }
      if (context?.previousUsers) {
        queryClient.setQueriesData(
          { queryKey: ["users"] },
          context.previousUsers,
        );
      }
    },
    onSettled: (_data, _error, userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
