import { useMutation } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast } from '@/services/toasterServices';
// import { useRouter } from 'next/navigation';

export default function usePostStripePayment(setClientSecret) {
  //   const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.post(
        apiEndPoints.POST_STRIPE_PAYMENT,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      // localStorage.clear();
      setClientSecret(data?.clientSecret);
      // router.push('/auth/change-password?s=1', { replace: true });
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
