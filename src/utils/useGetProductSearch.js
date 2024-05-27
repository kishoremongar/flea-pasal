import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import apiEndPoints from '@/services/apiEndPoints';
import createQueryParamsForGetReq from '@/helper/createQueryParamsForGetReq';

export default function useGetProductSearch(value) {
  return useQuery({
    queryKey: ['productSearch', value],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        createQueryParamsForGetReq(apiEndPoints.SEARCH_PRODUCT_LIST, value)
      );
      return res.data;
    },
    enabled: Boolean(value?.search) && value?.search.length > 2,
  });
}
