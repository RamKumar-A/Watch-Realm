import { useQuery } from '@tanstack/react-query';

import { getCart as getCartApi } from '../../services/apiCart';

export function useCart() {
  const {
    data: cart,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartApi,
  });
  return { cart, isError, isPending };
}
