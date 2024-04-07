import { searchService } from '@/services/search.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const search = 'search';

export const useSearchQuery = (
  query: { search?: string },
  options?: QueryOptions<AxiosResponse<SearchModel>>
) => {
  return useQuery({
    queryKey: [search, query],
    queryFn: () => searchService.search(query),
    ...options,
  });
};
