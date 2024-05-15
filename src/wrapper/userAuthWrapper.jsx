'use client';

import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addTokens, addUser, removeTokens } from '../store/slices/auth';
// import { useRouter } from 'next/navigation';
// import { isTokenExpired } from '@/utils/isTokenExpired';

export default function UserAuthWrapper() {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();
  // const router = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (status === 'authenticated' && !accessToken) {
      dispatch(
        addTokens({
          accessToken: sessionData.accessToken,
          refreshToken: sessionData.refreshToken,
        })
      );
      dispatch(addUser(sessionData.user));
    } else if (status === 'unauthenticated') {
      dispatch(removeTokens());
      // router.push('/auth/login');
    }

    // if (isTokenExpired(sessionData?.accessToken)) {
    //   signOut({
    //     redirect: true,
    //     callbackUrl: '/auth/login',
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // if (status === 'loading' || !accessToken) {
  //   return <p>Loading...</p>;
  // }

  return null;
}
