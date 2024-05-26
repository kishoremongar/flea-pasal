import { useQuery } from '@tanstack/react-query';
import makeApiRequest from '@/services/makeApiRequest';
import apiEndPoints from '@/services/apiEndPoints';

export default function useGetUserProfile() {
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: async () => {
      const res = await makeApiRequest.get(apiEndPoints.USER_DETAILS);
      return res.data;
    },
  });
}
