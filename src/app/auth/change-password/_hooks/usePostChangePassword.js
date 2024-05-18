import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '../../../../services/apiEndPoints';
import makeApiRequest from '../../../../services/makeApiRequest';
import { ErrorToast, SuccessToast } from '../../../../services/toasterServices';

export default function usePostChangePassword() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.RESET_PASSWORD,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.message === 'Password changed successfully') {
        localStorage.clear();
        router.push('/auth/change-password?s=1', { replace: true });
        SuccessToast({ text: data?.message });
      } else {
        router.push('/auth/change-password?s=0', { replace: true });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.message });
    },
  });
}
