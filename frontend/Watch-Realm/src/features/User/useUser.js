import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../services/apiUsers';

export function useUser() {
  const token = Boolean(localStorage.getItem('token'));
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUser,
    enabled: token,
  });

  return {
    user,
    isPending,
    isError,
    isAuthenticated:
      user?.data?.role === 'user' || user?.data?.role === 'admin',
  };
}
