import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePassword as updatePasswordApi } from '../../services/apiUsers';

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['users'], user);
    },
  });

  return { updatePassword, isPending, isError };
}
