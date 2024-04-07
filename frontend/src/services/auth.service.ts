import { api } from '@/config/axiosConfig';
import { fetchConfig } from '@/config/fetchConfig';

export const authService = {
  async signIn(body: SignInDto) {
    return await fetchConfig<SignInModel>({
      route: '/api/users/token/',
      method: 'POST',
      body,
    });
  },
  async signUp(body: SignUpDto) {
    return await fetchConfig<SignUpModel>({
      route: '/api/users/register/',
      method: 'POST',
      body,
    });
  },
  async refreshToken(body: RefreshTokenDto) {
    return api.post<RefreshTokenModel>('/api/users/token/refresh/', body);
  },
  async fetchRefreshToken(body: RefreshTokenDto) {
    return await fetchConfig<RefreshTokenModel>({
      route: '/api/users/token/refresh/',
      method: 'POST',
      body,
    });
  },
};
