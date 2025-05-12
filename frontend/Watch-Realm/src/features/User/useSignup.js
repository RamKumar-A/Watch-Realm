import { useMutation } from '@tanstack/react-query';

import { signup as signupApi } from '../../services/apiUsers';

export function useSignup() {
  const {
    mutate: signup,
    isPending,
    isError,
  } = useMutation({
    mutationFn: signupApi,
  });

  return { signup, isPending, isError };
}
