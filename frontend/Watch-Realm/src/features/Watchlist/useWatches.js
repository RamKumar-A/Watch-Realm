import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getWatch } from '../../services/apiWatches';

export function useWatches() {
  const [searchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category')?.split(','),
    brand: searchParams.get('brand')?.split(','),
    material: searchParams.get('material')?.split(','),
    sort: searchParams.get('sort'), // Single-value parameter
    search: searchParams.get('search'),
  };

  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['watches', filters],
    queryFn: ({ pageParam = 1 }) => getWatch(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.length > 0 ? allPages?.length + 1 : undefined;
    },
  });

  const watches = data?.pages?.flatMap((p) => p.data) ?? [];
  const totalResults = data?.pages?.[0]?.totalResults;
  return {
    watches,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    totalResults,
  };
}

// const {
//   data: watches,
//   isPending,
//   error,
// } = useQuery({
//   queryKey: ['watches', filters, page],
//   queryFn: () => getWatch(filters, page),
//   keepPreviousData: true, // Optional: Keeps previous data while fetching new data
// });
