import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../services/apiUsers';

export function useUser() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUser,
  });

  return {
    user,
    isPending,
    isError,
    isAuthenticated:
      user?.data?.role === 'user' || user?.data?.role === 'admin',
  };
}
