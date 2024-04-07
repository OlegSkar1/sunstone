import { sectionService } from '@/services/section.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getSection = 'getSection';

export const useSectionQuery = (
  slug: string,
  options?: QueryOptions<AxiosResponse<SectionModel>>
) =>
  useQuery({
    queryKey: [getSection, slug],
    queryFn: () => sectionService.getSection(slug),
    ...options,
  });
