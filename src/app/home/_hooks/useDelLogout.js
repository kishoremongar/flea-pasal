import { useQuery } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';

export default function useDelLogout(handleClose, setLogoutLoading) {
  return useQuery({
    queryFn: async () => {
      const res = await makeApiRequest.delete(apiEndPoints.USER_LOGOUT);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.msg) {
        setLogoutLoading(false);
        handleClose();
        SuccessToast({ text: data?.msg });
      }
    },
    onError: (error) => {
      setLogoutLoading(true);
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
