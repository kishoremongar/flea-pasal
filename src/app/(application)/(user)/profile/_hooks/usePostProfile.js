'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiEndPoints from '@/services/apiEndPoints';
import makeApiRequest from '@/services/makeApiRequest';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';

export default function usePostProfile(cb) {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await makeApiRequest.patch(
        apiEndPoints.USER_DETAILS,
        data
      );
      return response?.data;
    },
    onSuccess: (data) => {
      if (data.msg) {
        cb();
        query.invalidateQueries(['user_profile']);
        SuccessToast({ text: data.msg });
      }
    },
    onError: (error) => {
      ErrorToast({ text: error?.response?.data?.msg });
    },
  });
}
