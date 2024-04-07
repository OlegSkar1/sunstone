import { api } from '@/config/axiosConfig';

export const sectionService = {
  async getSections({ page, size }: SectionListDto) {
    return api.get<SectionListModel>(
      `/api/sections/?page=${page}&size=${size}`
    );
  },
  async getSection(slug: number) {
    return api.get<SectionModel>(`/api/sections/${slug}/`);
  },
};
