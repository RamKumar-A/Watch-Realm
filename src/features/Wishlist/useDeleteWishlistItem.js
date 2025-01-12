import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWishlistItem as deleteWishlistItemApi } from '../../services/apiWishlist';

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteWishlistItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ itemId }) => deleteWishlistItemApi({ itemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return { deleteWishlistItem, isPending, isError };
}
