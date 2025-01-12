import { useQuery } from '@tanstack/react-query';

import { getFilters } from '../../services/apiWatches';

export function useWatchFilter() {
  const {
    data: watchFilters,
    isPending,
    error,
  } = useQuery({
    queryKey: ['watchFilters'],
    queryFn: getFilters,
  });
  const { categoryData, brandData, materialData } = watchFilters || {};

  return { categoryData, brandData, materialData, isPending, error };
}
