import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWishlistItem as createWishlistItemApi } from '../../services/apiWishlist';

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  const {
    mutate: createWishlistItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ watchId }) => createWishlistItemApi(watchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return { createWishlistItem, isPending, isError };
}
