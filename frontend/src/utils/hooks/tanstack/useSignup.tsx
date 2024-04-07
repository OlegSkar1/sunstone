import { authService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const signup = 'signup';

export const useSignupMutation = (
  options?: MutationOptions<SignUpModel, SignUpDto>
) =>
  useMutation({
    mutationKey: [signup],
    mutationFn: (data) => authService.signUp(data),
    ...options,
  });
