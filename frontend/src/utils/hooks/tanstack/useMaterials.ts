import { materialsService } from '@/services/materials.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getMaterials = 'getMaterials';

export const useMaterialsQuery = (
  params?: MaterialsListDto,
  options?: QueryOptions<AxiosResponse<MaterialsModel>>
) =>
  useQuery({
    queryKey: [getMaterials, params],
    queryFn: () => materialsService.getMaterials(params),
    ...options,
  });

export const useSlugMaterialsQuery = (
  id: string,
  options?: QueryOptions<AxiosResponse<MaterialModel>>
) =>
  useQuery({
    queryKey: [getMaterials, id],
    queryFn: () => materialsService.getSlugMaterials(id),
    ...options,
  });
