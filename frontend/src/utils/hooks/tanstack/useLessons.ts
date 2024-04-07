import { lessonsService } from '@/services/lessons.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getLessons = 'getLessons';

export const useLessonsQuery = (
  params?: SectionListDto,
  options?: QueryOptions<AxiosResponse<LessonsListModel>>
) =>
  useQuery({
    queryKey: [getLessons, params],
    queryFn: () => lessonsService.getLessons(params),
    ...options,
  });

export const useSlugLessonsQuery = (
  id: string,
  options?: QueryOptions<AxiosResponse<LessonModel>>
) =>
  useQuery({
    queryKey: [getLessons, id],
    queryFn: () => lessonsService.getSlugLessons(id),
    ...options,
  });
