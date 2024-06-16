import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import apiEndPoints from '@/services/apiEndPoints';
import createQueryParamsForGetReq from '@/helper/createQueryParamsForGetReq';

export default function useGetFilterData(category) {
  return useQuery({
    queryKey: ['filter', category],
    queryFn: async () => {
      const res = await makeApiRequest.get(
        createQueryParamsForGetReq(
          apiEndPoints.GET_PRODUCTS_FILTER_DATA,
          category
        )
      );
      return res.data;
    },
  });
}
