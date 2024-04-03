import { fetchConfig } from '@/config/fetchConfig';

export const authService = {
  async signIn(body: SignInDto) {
    return await fetchConfig<SignInModel>({
      route: '/api/users/token/',
      method: 'POST',
      body,
    });
  },
  async refreshToken(body: RefreshTokenDto) {
    return await fetchConfig<RefreshTokenModel>({
      route: '/api/users/token/refresh/',
      method: 'POST',
      body,
    });
  },
};
