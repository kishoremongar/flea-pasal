import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';

export default function usePostVerifyEmail() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.USER_VERIFY_EMAIL,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.msg) {
        SuccessToast({ text: data?.msg });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
