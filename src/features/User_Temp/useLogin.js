import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../../services/apiUsers';

export function useLogin() {
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    isError,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate('/my-account');
    },
  });

  return { login, isPending, isError };
}
