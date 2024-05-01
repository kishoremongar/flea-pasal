import { useSelector } from 'react-redux';
import { Transition } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MainNavbar, { NavItem } from '@/components/common/navbar';

export default function NavContainer({ children }) {
  const isSidebarOpened = useSelector(
    (store) => store.auth?.sidebarOpened?.status
  );
  const pathName = usePathname();
  const { status } = useSession();

  return (
    <div>
      <main className='flex min-h-screen flex-col bg-off-white'>
        <MainNavbar pathName={pathName?.split('/')?.slice(1, 2)?.[0]} />
        <div className='flex relative md:hidden'>
          <Transition
            mounted={isSidebarOpened}
            transition='slide-right'
            duration={400}
            timingFunction='ease'
          >
            {(styles) => {
              return (
                <div
                  style={styles}
                  className='bg-[#af8e84] py-4 w-9/12 flex flex-col justify-between z-10 h-[calc(100vh-64px)] px-10 text-white'
                >
                  <NavItem
                    alterClass='gap-x-6 gap-y-4 justify-center md:hidden flex flex-col'
                    pathName={pathName?.split('/')?.slice(1, 2)?.[0]}
                  />
                  {status === 'unauthenticated' && (
                    <div className='flex flex-col gap-y-4 w-full text-white'>
                      <Link
                        href='/auth/login'
                        className='text-center bg-primary py-2 rounded-md w-full text-base'
                      >
                        Sign up
                      </Link>
                      <div
                        href='/auth/login'
                        className='text-brown2 text-center text-sm'
                      >
                        Already have an account?{' '}
                        <Link href='/auth/login' className='text-white'>
                          Login
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          </Transition>
          <div className='absolute'>{children}</div>
        </div>
        <div className='hidden md:block'>{children}</div>
      </main>
    </div>
  );
}
