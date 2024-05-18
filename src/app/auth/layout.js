'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Logo from '@@/assets/icons/logo.svg';
import LoginHero from '@@/assets/icons/loginBg.svg';

export default function AuthLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const verifyToken = searchParams.get('token');
  const verifyEmail = searchParams.get('email');

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (pathName === '/auth/verify-email') {
        router.push(`${pathName}?token=${verifyToken}&email=${verifyEmail}`);
      } else {
        router.push(pathName === '/auth' ? '/auth/login' : pathName);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  if (status === 'authenticated') {
    router.push('/');
    router.refresh();
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <div>Redirecting...</div>;
  }
  return (
    <div
      className={`min-h-screen items-center bg-off-white w-full ${
        !verifyToken && !verifyEmail && 'md:grid md:grid-cols-2'
      }`}
    >
      {!verifyToken && !verifyEmail && (
        <div className='sm:block hidden'>
          <LoginHero />
        </div>
      )}
      <div
        className={`flex flex-col items-center justify-center p-7 sm:p-0 gap-y-7 min-h-screen ${
          !verifyToken && !verifyEmail && 'md:min-h-0'
        }`}
      >
        <Logo />
        <div className='flex flex-col gap-y-7 bg-white my-0 mx-auto rounded-md overflow-hidden border-[#E9E9EA] border shadow-md p-7 max-w-[30rem] w-full'>
          {children}
        </div>
      </div>
    </div>
  );
}
