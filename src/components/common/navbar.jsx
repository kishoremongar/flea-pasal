import { Burger, HoverCard, Transition } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import Link from 'next/link';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import LogoPlain from '../../../public/assets/icons/logoPlain.svg';
import SearchIcon from '../../../public/assets/icons/magnifying-glass.svg';
import CartIcon from '../../../public/assets/icons/cart.svg';
import UserIcon from '../../../public/assets/icons/user.svg';
import { sidebarToggle } from '@/store/slices/auth';

export default function MainNavbar() {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch();
  const { status } = useSession();
  const pathName = usePathname();
  const getPath = pathName?.split('/')?.slice(1, 2)?.[0];
  const { height } = useViewportSize();

  useEffect(() => {
    dispatch(sidebarToggle(opened));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <div className='flex flex-col fixed top-0 z-50 w-full text-white text-md tracking-normal'>
      <div className='flex items-center w-full justify-between bg-secondary min-h-16 md:min-h-[4.75rem] px-4 md:px-8 py-4 md:py-6'>
        <div className='flex items-center gap-x-4 md:gap-x-10'>
          <Burger
            color='white'
            hiddenFrom='sm'
            size='sm'
            opened={opened}
            onClick={toggle}
            aria-label='Toggle navigation'
          />
          <Link href='/'>
            <LogoPlain className='w-20 sm:w-24 md:w-32 -mt-1 cursor-pointer' />
          </Link>
          <NavItem alterClass='gap-x-6 md:flex hidden' pathName={getPath} />
        </div>
        <ul className='flex items-center gap-x-6'>
          <li>
            {/* <TextInput
              placeholder='Search'
              rightSection={<SearchIcon className='text-primary !w-4 !h-4' />}
              className='mobile-xl:block hidden w-40 md:w-36 lg:w-52'
            /> */}
            <SearchIcon
              className='cursor-pointer text-white w-4 h-4 sm:w-5 sm:h-5'
              onClick={spotlight.open}
            />
          </li>
          {/* <li className='cursor-pointer'>Favourites</li> */}
          <li className='cursor-pointer'>
            <Link href='/cart'>
              <CartIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
            </Link>
          </li>
          <li className='cursor-pointer'>
            <Link
              href={status === 'unauthenticated' ? '/auth/login' : '/profile'}
            >
              <UserIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex md:hidden'>
        <MobileSideBar
          status={status}
          opened={opened}
          pathName={getPath}
          height={height}
        />
      </div>
    </div>
  );
}

export const NavItem = ({ alterClass, pathName }) => {
  const data = [
    { label: 'Home', navigateTo: '/', activeClassName: 'home' },
    {
      label: 'Pasal',
      navigateTo: '/pasal',
      activeClassName: 'pasal',
      subLabel: [
        { id: 1, label: 'Apparel', linkTo: '/apparel' },
        { id: 2, label: 'Shoes', linkTo: '/shoes' },
        { id: 3, label: 'Krafts', linkTo: '/krafts' },
        { id: 4, label: 'Books', linkTo: '/books' },
      ],
    },
    { label: 'About', navigateTo: '/about', activeClassName: 'about' },
    { label: 'Support', navigateTo: '/support', activeClassName: 'support' },
  ];
  return (
    <div className={alterClass}>
      {data?.map((item) =>
        item?.label === 'Pasal' ? (
          <HoverCard
            shadow='md'
            transition='pop'
            classNames={{
              dropdown: '!bg-secondary text-white border-none',
            }}
            key={item.label}
            withArrow
          >
            <HoverCard.Target>
              <p
                className={`cursor-context-menu underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                  pathName?.startsWith(item?.activeClassName) && 'underline'
                }`}
              >
                {item?.label}
              </p>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div className='flex flex-col gap-y-2'>
                {item?.subLabel?.map((sub) => (
                  <Link
                    key={sub?.id}
                    href={sub?.linkTo}
                    className={`cursor-pointer underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                      pathName?.startsWith(item?.activeClassName) && 'underline'
                    }`}
                  >
                    {sub?.label}
                  </Link>
                ))}
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <Link
            href={item?.navigateTo}
            key={item.label}
            className={`underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
              pathName === ''
                ? item?.activeClassName === 'home' && 'underline'
                : pathName?.startsWith(item?.activeClassName) && 'underline'
            }`}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
};

const MobileSideBar = ({ status, opened, pathName, height }) => {
  const sidebarHeight = height - 64;
  const userData = useSelector((store) => store.auth.user);
  return (
    <Transition
      mounted={opened}
      transition='slide-right'
      duration={400}
      timingFunction='ease'
    >
      {(styles) => {
        return (
          <div
            style={{ ...styles, height: sidebarHeight }}
            className={`py-4 w-9/12 bg-secondary flex flex-col justify-between px-10 text-white`}
          >
            <NavItem
              alterClass='gap-x-6 gap-y-4 justify-center md:hidden flex flex-col'
              pathName={pathName}
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
            {status === 'authenticated' && (
              <p className=' text-white capitalize'>Hello {userData?.name}</p>
            )}
          </div>
        );
      }}
    </Transition>
  );
};
