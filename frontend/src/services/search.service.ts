import { api } from '@/config/axiosConfig';

export const searchService = {
  async search({ search }: { search?: string }) {
    return api.get<SearchModel>('/api/search/search/', {
      params: { search },
    });
  },
};
