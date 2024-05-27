import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';

export default function usePostChangePassword(cb) {
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.POST_CHANGE_PASSWORD,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.msg) {
        cb();
        SuccessToast({ text: data?.msg });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
