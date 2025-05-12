import { useQuery } from '@tanstack/react-query';

import { getCart as getCartApi } from '../../services/apiCart';
import { useUser } from '../User/useUser';

export function useCart() {
  const { isAuthenticated } = useUser();
  const {
    data: cart,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi,
    enabled: isAuthenticated,
  });
  return { cart, isError, isPending };
}
