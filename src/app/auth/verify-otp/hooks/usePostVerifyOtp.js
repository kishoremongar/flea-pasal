'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '../../../../services/apiEndPoints';
import makeApiRequest from '../../../../services/makeApiRequest';
import { ErrorToast, SuccessToast } from '../../../../services/toasterServices';

export default function usePostVerifyOtp({ otp }, setOtp) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(apiEndPoints.VERIFY_OTP, data);
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.message === 'OTP verified successfully') {
        localStorage.setItem('otp', otp);
        router.push('/auth/change-password', { replace: true });
        SuccessToast({ text: data?.message });
        setOtp('');
      } else {
        router.push('/auth/forgot-password', { replace: true });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.message });
    },
  });
}
