import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import apiEndPoints from '@/services/apiEndPoints';

export default function useGetSingleProduct(productId) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        `${apiEndPoints.GET_ALL_PRODUCTS}${productId}`
      );
      return res.data;
    },
  });
}
