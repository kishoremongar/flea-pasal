import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import apiEndPoints from '@/services/apiEndPoints';

export default function useGetUserOrders() {
  return useQuery({
    queryKey: ['userAllOrder'],
    queryFn: async () => {
      const res = await makeApiRequest.get(apiEndPoints.GET_USER_ORDER_LIST);
      return res.data;
    },
  });
}
