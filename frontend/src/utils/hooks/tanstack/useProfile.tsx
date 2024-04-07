import { userService } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const profile = 'profile';

export const useProfileQuery = (
  options?: QueryOptions<AxiosResponse<MyProfileModel>>
) =>
  useQuery({
    queryKey: [profile],
    queryFn: () => userService.myProfile(),
    ...options,
  });
