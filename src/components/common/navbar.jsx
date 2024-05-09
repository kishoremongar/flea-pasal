'use client';

import {
  Accordion,
  Burger,
  HoverCard,
  Indicator,
  Menu,
  Transition,
} from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import Link from 'next/link';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
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
  const { status, data: userData } = useSession();
  const pathName = usePathname();
  const getPath = pathName?.split('/')?.slice(1, 2)?.[0];
  const { width, height } = useViewportSize();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const mobileScreen = width < 768;
  const totalCartItems = useSelector(
    (store) => store?.cartItems?.cartData?.helperData
  )?.length;

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
          <NavItem
            alterClass='gap-x-6 md:flex hidden'
            pathName={getPath}
            toggle={toggle}
            mobileScreen={mobileScreen}
          />
        </div>
        <ul className='flex items-center gap-x-6'>
          <li>
            {/* <TextInput
              placeholder='Search'
              rightSection={<SearchIcon className='text-primary !w-4 !h-4' />}
              className='mobile-xl:block hidden w-40 md:w-36 lg:w-52'
            /> */}
            <SearchIcon
              className='cursor-pointer hover:text-tertiary text-white w-4 h-4 sm:w-5 sm:h-5'
              onClick={spotlight.open}
            />
          </li>
          {/* <li className='cursor-pointer'>Favourites</li> */}
          <li className='cursor-pointer'>
            <Link href='/cart'>
              <Indicator
                inline
                disabled={totalCartItems === 0}
                label={totalCartItems}
                size={16}
              >
                <CartIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
              </Indicator>
            </Link>
          </li>
          <li className='cursor-pointer'>
            {status === 'unauthenticated' ? (
              <Link href='/auth/login'>
                <UserIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
              </Link>
            ) : (
              <Menu
                opened={popoverOpened}
                onChange={setPopoverOpened}
                position='bottom-end'
                shadow='md'
                offset={2}
                classNames={{
                  dropdown: '!bg-secondary !border-0',
                  itemLabel: '!text-white !hover:text-tertiary',
                  item: 'hover:!bg-transparent',
                }}
              >
                <Menu.Target>
                  <UserIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
                </Menu.Target>
                <Menu.Dropdown>
                  {userData?.user?.role === 'admin' ? (
                    <Menu.Item>Dashboard</Menu.Item>
                  ) : (
                    <>
                      <Menu.Item>Orders</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item>Profile</Menu.Item>
                    </>
                  )}
                  <Menu.Divider />
                  <Menu.Item>Change Password</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </li>
        </ul>
      </div>
      <div className='flex md:hidden'>
        <MobileSideBar
          status={status}
          opened={opened}
          pathName={getPath}
          height={height}
          toggle={toggle}
          mobileScreen={mobileScreen}
        />
      </div>
    </div>
  );
}

export const NavItem = ({ alterClass, pathName, toggle, mobileScreen }) => {
  const data = [
    { label: 'Home', navigateTo: '/', activeClassName: 'home' },
    {
      label: 'Pasal',
      navigateTo: '/pasal',
      activeClassName: 'pasal',
      subLabel: [
        {
          id: 1,
          label: 'Apparel',
          linkTo: '/apparel',
          activeClassName: 'apparel',
        },
        { id: 2, label: 'Shoes', linkTo: '/shoes', activeClassName: 'shoes' },
        {
          id: 3,
          label: 'Krafts',
          linkTo: '/krafts',
          activeClassName: 'krafts',
        },
        { id: 4, label: 'Books', linkTo: '/books', activeClassName: 'books' },
      ],
    },
    { label: 'About', navigateTo: '/about', activeClassName: 'about' },
    { label: 'Support', navigateTo: '/support', activeClassName: 'support' },
  ];

  const closeSidebar = mobileScreen ? () => toggle() : () => {};
  const isPasalActive = ['apparel', 'shoes', 'books', 'krafts'].includes(
    pathName
  );

  const navComponent = data?.map((item) => {
    const isPasal = item?.label === 'Pasal';
    const isMobilePasal = isPasal && mobileScreen;
    const isDesktopPasal = isPasal && !mobileScreen;

    if (isDesktopPasal) {
      return (
        <HoverCard
          shadow='lg'
          transition='pop'
          classNames={{
            dropdown: '!bg-secondary !text-white !border-none',
          }}
          key={item.label}
          offset={2}
        >
          <HoverCard.Target>
            <p
              className={`cursor-context-menu underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                isPasalActive && 'underline'
              }`}
            >
              {item.label}
            </p>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className='flex flex-col gap-y-2'>
              {item.subLabel?.map((sub) => (
                <Link
                  key={sub?.id}
                  href={sub?.linkTo}
                  className={`cursor-pointer underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                    pathName === sub?.activeClassName && 'underline'
                  }`}
                  onClick={closeSidebar}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    } else if (isMobilePasal) {
      return (
        <Accordion
          key={item.label}
          variant='default'
          classNames={{
            control: '!p-0 !text-white active:!bg-secondary !w-[40%]',
            label: 'flex-[0.5]',
          }}
          defaultValue={isPasalActive ? 'pasal' : ''}
        >
          <Accordion.Item value='pasal' className='!border-none'>
            <Accordion.Control>
              <p
                className={`cursor-context-menu underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                  isPasalActive && 'underline'
                }`}
              >
                {item.label}
              </p>
            </Accordion.Control>
            <Accordion.Panel>
              <div className='flex flex-col gap-y-2'>
                {item.subLabel?.map((sub) => (
                  <Link
                    key={sub?.id}
                    href={sub?.linkTo}
                    className={`cursor-pointer underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
                      pathName === sub?.activeClassName && 'underline'
                    }`}
                    onClick={closeSidebar}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );
    }
    return (
      <Link
        href={item?.navigateTo}
        key={item.label}
        className={`underline-offset-4 hover:underline relative inline-block transition duration-200 ease-in-out ${
          pathName === ''
            ? item?.activeClassName === 'home' && 'underline'
            : pathName?.startsWith(item?.activeClassName) && 'underline'
        }`}
        onClick={closeSidebar}
      >
        {item.label}
      </Link>
    );
  });
  return <div className={alterClass}>{navComponent}</div>;
};

const MobileSideBar = ({
  status,
  opened,
  pathName,
  height,
  toggle,
  mobileScreen,
}) => {
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
              toggle={toggle}
              mobileScreen={mobileScreen}
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
              <p className=' text-white capitalize text-center'>
                Hello {userData?.name}
              </p>
            )}
          </div>
        );
      }}
    </Transition>
  );
};
