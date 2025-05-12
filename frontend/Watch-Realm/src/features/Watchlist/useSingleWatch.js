import { useQuery } from '@tanstack/react-query';

import { getSingleWatch } from '../../services/apiWatches';
import { useParams } from 'react-router-dom';

export function useSingleWatch() {
  const params = useParams();
  const { data, isPending, isError } = useQuery({
    queryKey: ['singleWatch'],
    queryFn: () => getSingleWatch(params.pid),
  });
  return { data, isError, isPending };
}
