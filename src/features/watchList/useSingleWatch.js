import { useQuery } from '@tanstack/react-query';

import { getSingleWatch } from '../../services/apiWatches';

export function useSingleWatch(id) {
  // const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery({
    queryKey: ['singleWatch'],
    queryFn: () => getSingleWatch(id),
  });
  return { data, isError, isPending };
}
