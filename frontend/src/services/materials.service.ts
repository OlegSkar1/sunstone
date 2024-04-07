import { api } from '@/config/axiosConfig';

export const materialsService = {
  async getMaterials(params?: MaterialsListDto) {
    return api.get<MaterialsModel>('/api/materials/', { params });
  },
  async getSlugMaterials(slug: string) {
    return api.get<MaterialModel>(`/api/materials/${slug}/`);
  },
};
