import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCartItem as updateCartItemApi } from '../../services/apiCart';

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCartItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ itemId, quantity }) => updateCartItemApi(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { updateCartItem, isPending, isError };
}
