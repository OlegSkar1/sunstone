'use client';
import { api } from '@/config/axiosConfig';
import { useRefreshToken } from '@/utils/hooks/useRefreshToken';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, PropsWithChildren, useEffect } from 'react';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useSession();
  const refreshToken = useRefreshToken();
  api.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${data?.user?.access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;

        const refreshTokenData = await refreshToken();
        await signIn('CredentialsRefresh', {
          redirect: false,
          callbackUrl: window.location.href,
          access: refreshTokenData?.user.access_token,
          access_expires_at: refreshTokenData?.user.access_expires_at,
          refresh: data?.user.refresh_token,
          refresh_expires_at: data?.user.refresh_expires_at,
        });
        prevRequest.headers[
          'Authorization'
        ] = `Bearer ${data?.user?.access_token}`;
        return api(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') signOut();
  }, [data]);

  return children;
};

export default AuthProvider;
