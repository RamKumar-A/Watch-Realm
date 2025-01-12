import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCartItem as createCartItemApi } from '../../services/apiCart';

export function useCreateCartItem() {
  const queryClient = useQueryClient();

  const {
    mutate: createCartItem,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ watchId }) => createCartItemApi(watchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { createCartItem, isPending, isError };
}
