import { useQuery } from '@tanstack/react-query';

import { getWishlist } from '../../services/apiWishlist';

export function useWishlist() {
  const {
    data: wishlist,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  return { wishlist, isPending, isError };
}
