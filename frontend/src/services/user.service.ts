'use client';

import { api } from '@/config/axiosConfig';

export const userService = {
  async myProfile() {
    return api.get<MyProfileModel>('/api/profiles/myprofile/');
  },
};
