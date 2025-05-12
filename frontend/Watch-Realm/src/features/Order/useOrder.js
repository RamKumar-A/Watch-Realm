import { useQuery } from '@tanstack/react-query';

import { useUser } from '../User/useUser';

import { getUserOrders } from '../../services/apiOrders';

export function useOrder() {
  const { user } = useUser();
  const {
    data: order,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getUserOrders(user?.data?._id) || [],
  });

  return { order, isError, isPending };
}
