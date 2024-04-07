import { api } from '@/config/axiosConfig';

export const testingsService = {
  async getTestings(params?: TestingsListDto) {
    return api.get<TestingsModel>('/api/testings/', { params });
  },
};
