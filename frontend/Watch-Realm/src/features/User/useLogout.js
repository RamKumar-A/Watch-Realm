import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout as logoutApi } from '../../services/apiUsers';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users'] });
      queryClient.removeQueries({ queryKey: ['wishlist'] });
      queryClient.removeQueries({ queryKey: ['cart'] });

      navigate('/');
    },
  });

  return { logout, isPending, isError };
}
