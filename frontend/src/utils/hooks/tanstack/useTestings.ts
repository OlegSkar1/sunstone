import { testingsService } from '@/services/testings.service';
import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useSlugTestingsQuery = (
  id: string,
  options?: QueryOptions<AxiosResponse<TestModel>>
) =>
  useQuery({
    queryKey: [getTestings, id],
    queryFn: () => testingsService.getSlugTestings(id),
    ...options,
  });

export const checkAnswer = 'checkAnswer';
export const useCheckAnswerMutation = (
  options?: MutationOptions<AxiosResponse<CheckAnswerModel>, CheckAnswerDto>
) =>
  useMutation({
    mutationKey: [checkAnswer],
    mutationFn: ({ answer, id, test_mode }) =>
      testingsService.checkAnswer({
        id,
        answer,
        test_mode,
      }),
    ...options,
  });
