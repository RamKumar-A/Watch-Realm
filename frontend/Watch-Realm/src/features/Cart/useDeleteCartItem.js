import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCartItem as deleteCartItemApi } from '../../services/apiCart';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCartItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ itemId }) => deleteCartItemApi(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  return { deleteCartItem, isPending, isError };
}
