import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login as loginApi } from '../../services/apiUsers';

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['users'], { data: user });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { login, isPending, isError };
}
