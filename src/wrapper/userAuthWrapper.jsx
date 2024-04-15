/**
 * Custom React hook that handles user authentication state with NextAuth.
 * Gets session data from NextAuth and dispatches tokens and user info to Redux store.
 * Allows consuming components to access authentication state from Redux.
 */
'use client';

import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addTokens, addUser, removeTokens } from '../store/slices/auth';

export default function UserAuthWrapper() {
  const { data: sessionData, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
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
    }
    if (status === 'unauthenticated') {
      dispatch(removeTokens());
      router.push('/auth/login');
    }
  }, [status]);

  return null;
}
