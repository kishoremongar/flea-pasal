'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Logo from '../../../public/assets/icons/logo.svg';
import LoginHero from '../../../public/assets/icons/loginBg.svg';

export default function AuthLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(pathName === '/auth' ? '/auth/login' : pathName);
    }
  }, [status]);
  if (status === 'authenticated') {
    router.push('/dashboard');
    router.refresh();
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <div>Redirecting...</div>;
  }
  return (
    <div className='min-h-screen md:grid md:grid-cols-2 items-center bg-primary w-full'>
      <div className='sm:block hidden'>
        <LoginHero />
      </div>
      <div className='flex flex-col items-center justify-center p-7 sm:p-0 gap-y-7 min-h-screen md:min-h-0'>
        <Logo className='text-darkPink' />
        <div className='flex flex-col gap-y-7 bg-white my-0 mx-auto rounded-md overflow-hidden border-[#E9E9EA] border shadow-primary-shadow p-7 max-w-[30rem] w-full'>
          {children}
        </div>
      </div>
    </div>
  );
}
