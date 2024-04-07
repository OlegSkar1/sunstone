import { api } from '@/config/axiosConfig';

export const lessonsService = {
  async getLessons(params?: SectionListDto) {
    return api.get<LessonsListModel>('/api/lessons/', { params });
  },
  async getSlugLessons(id: string) {
    return api.get<LessonModel>(`/api/lessons/${id}/`);
  },
};
