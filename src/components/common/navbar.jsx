import { Burger } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LogoPlain from '../../../public/assets/icons/logoPlain.svg';
import SearchIcon from '../../../public/assets/icons/magnifying-glass.svg';
import CartIcon from '../../../public/assets/icons/cart.svg';
import UserIcon from '../../../public/assets/icons/user.svg';
import { sidebarToggle } from '@/store/slices/auth';

export default function MainNavbar({ pathName }) {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sidebarToggle(opened));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between bg-secondary min-h-16 md:min-h-[4.75rem] px-4 md:px-8 py-4 md:py-6 text-white text-md tracking-normal'>
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
          <NavItem alterClass='gap-x-6 md:flex hidden' pathName={pathName} />
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
            <UserIcon className='text-white hover:text-tertiary w-4 h-4 sm:w-5 sm:h-5' />
          </li>
        </ul>
      </div>
    </div>
  );
}

export const NavItem = ({ alterClass, pathName }) => {
  const data = [
    { label: 'Home', navigateTo: '/', activeClassName: 'home' },
    { label: 'Catalogs', navigateTo: '/catalogs', activeClassName: 'catalogs' },
    { label: 'About', navigateTo: '/about', activeClassName: 'about' },
    { label: 'Support', navigateTo: '/support', activeClassName: 'support' },
  ];
  return (
    <div className={alterClass}>
      {data?.map((item) => (
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
      ))}
    </div>
  );
};
