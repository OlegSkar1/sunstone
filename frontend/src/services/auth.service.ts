import { fetchConfig } from '@/config/fetchConfig';

export const authService = {
  async signIn(body: SignInDto) {
    return await fetchConfig<SignInModel>({
      route: '/api/users/token/',
      method: 'POST',
      body,
    });
  },
};
