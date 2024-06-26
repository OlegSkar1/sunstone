'use client';

import { api } from '@/config/axiosConfig';
import { authService } from '@/services/auth.service';
import { signIn, signOut, useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session } = useSession();
  const refreshToken = async () => {
    const res = await authService.refreshToken({
      refresh: session?.user.refresh_token,
    });

    if (session) {
      session.user.access_token = res.data.access;
      session.user.access_expires_at = res.data.expires_at;
      return session;
    } else signIn();
  };

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        await signOut({ callbackUrl: '/signin', redirect: false });
      }
      return Promise.reject(error);
    }
  );

  return refreshToken;
};
