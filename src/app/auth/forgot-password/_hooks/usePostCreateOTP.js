import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '../../../../services/apiEndPoints';
import makeApiRequest from '../../../../services/makeApiRequest';
import { ErrorToast, SuccessToast } from '../../../../services/toasterServices';

export default function usePostCreateOTP({ email }) {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(apiEndPoints.CREATE_OTP, data);
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.message === 'OTP sent successfully') {
        localStorage.setItem('email', email);
        router.push('/auth/verify-otp', { replace: true });
        SuccessToast({ text: data?.message });
      } else {
        router.push('/auth/forgot-password', { replace: true });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.message });
    },
  });
}
