import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCartItem as deleteCartItemAi } from '../../services/apiCart';

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCartItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ itemId }) => deleteCartItemAi(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  return { deleteCartItem, isPending, isError };
}
