import { api } from '@/config/axiosConfig';

export const sectionService = {
  async getSections(params?: SectionListDto) {
    return api.get<SectionListModel>('/api/sections/', { params });
  },
  async getSection(slug: string) {
    return api.get<SectionModel>(`/api/sections/${slug}/`);
  },
};
