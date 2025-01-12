import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReview as createReviewApi } from '../../../services/apiReviews';

export function useCreateReview() {
  const queryClient = useQueryClient();

  const {
    mutate: createReview,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ watchId, rating, review }) =>
      createReviewApi({ watchId, rating, review }),
    onSuccess: () => {
      queryClient.invalidateQueries(['watches', 'users']);
    },
  });

  return { createReview, isPending, isError };
}
