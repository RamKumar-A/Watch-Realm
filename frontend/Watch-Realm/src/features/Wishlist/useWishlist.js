import { useQuery } from '@tanstack/react-query';

import { getWishlist } from '../../services/apiWishlist';
import { useUser } from '../User/useUser';

export function useWishlist() {
  const { isAuthenticated } = useUser();
  const {
    data: wishlist,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });

  return { wishlist, isPending, isError };
}
