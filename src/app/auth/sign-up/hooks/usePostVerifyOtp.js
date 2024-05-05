'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '../../../../services/apiEndPoints';
import makeApiRequest from '../../../../services/makeApiRequest';
import { ErrorToast, SuccessToast } from '../../../../services/toasterServices';

export default function usePostSignUp(cb) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.USER_REGISTER,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.msg) {
        cb();
        SuccessToast({ text: data.msg });
        setTimeout(() => {
          router.push('/auth/login', { replace: true });
        }, 5000);
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
