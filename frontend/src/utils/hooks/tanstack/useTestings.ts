import { testingsService } from '@/services/testings.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getTestings = 'getTestings';

export const useTestingsQuery = (
  params?: TestingsListDto,
  options?: QueryOptions<AxiosResponse<TestingsModel>>
) =>
  useQuery({
    queryKey: [getTestings, params],
    queryFn: () => testingsService.getTestings(params),
    ...options,
  });
