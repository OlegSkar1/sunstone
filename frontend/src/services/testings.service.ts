import { api } from '@/config/axiosConfig';

export const testingsService = {
  async getTestings(params?: TestingsListDto) {
    return api.get<TestingsModel>('/api/testings/', { params });
  },
  async getSlugTestings(id: string) {
    return api.get<TestModel>(`/api/testings/${id}/`);
  },
  async checkAnswer({ id, answer }: CheckAnswerDto) {
    return api.post<CheckAnswerModel>(`/api/questions/${id}/check_answer/`, {
      answer,
    });
  },
};
