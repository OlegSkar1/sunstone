import { sectionService } from '@/services/section.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getSections = 'getSections';

export const useSectionsQuery = (
  params?: SectionListDto,
  options?: QueryOptions<AxiosResponse<SectionListModel>>
) =>
  useQuery({
    queryKey: [getSections],
    queryFn: () =>
      sectionService.getSections({
        page: params?.page || '1',
        size: params?.size || '10',
      }),
    ...options,
  });
