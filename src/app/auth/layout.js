'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
// import Logo from '../../../public/assets/icons/logo.svg';
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
    <div className='min-h-screen md:grid md:grid-cols-2 bg-primary w-full'>
      <div className='sm:block hidden'>
        <LoginHero fill='red' />
      </div>
      <div className='flex flex-col items-center justify-center p-7 sm:p-0 md:gap-y-7'>
        {/* <div className='bg-secondary w-16 rounded-md flex items-center justify-center'>
          <Logo className='text-darkPink w-28 h-28' />
        </div> */}
        <p className='text-darkPink text-2xl font-semibold'>
          Thrift Shop(Logo)
        </p>
        <div className='flex flex-col gap-y-7 bg-white my-0 mx-auto rounded-md overflow-hidden border-[#E9E9EA] border shadow-primary-shadow p-7 max-w-[30rem] w-full'>
          {children}
        </div>
      </div>
    </div>
  );
}
