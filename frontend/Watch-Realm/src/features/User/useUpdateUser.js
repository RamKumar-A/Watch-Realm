import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser as updateUserApi } from '../../services/apiUsers';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (user) => updateUserApi(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { updateUser, isPending, isError };
}
