import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import createQueryParamsForGetReq from '@/helper/createQueryParamsForGetReq';
import apiEndPoints from '@/services/apiEndPoints';

export default function useGetAllProducts(category) {
  return useQuery({
    queryKey: ['allProducts', category],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        createQueryParamsForGetReq(apiEndPoints.GET_ALL_PRODUCTS, category)
      );
      return res.data;
    },
  });
}
