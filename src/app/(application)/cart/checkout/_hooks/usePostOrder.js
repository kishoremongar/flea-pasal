import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';
import { resetCartData } from '@/store/slices/cart';

export default function usePostOrder() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.POST_USER_ORDER,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      dispatch(resetCartData());
      SuccessToast({ text: data?.msg });
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
