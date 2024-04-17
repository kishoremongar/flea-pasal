import { TextInput } from '@mantine/core';
import Link from 'next/link';
import LogoPlain from '../../../public/assets/icons/logoPlain.svg';
import SearchIcon from '../../../public/assets/icons/magnifying-glass.svg';
import CartIcon from '../../../public/assets/icons/cart.svg';
import UserIcon from '../../../public/assets/icons/user.svg';

export default function MainNavbar() {
  return (
    <div className='flex items-center justify-between bg-primary px-24 py-5 text-white text-md tracking-normal'>
      <div className='flex items-center gap-x-16'>
        <Link href='/'>
          <LogoPlain className='w-32 -mt-2 cursor-pointer' />
        </Link>
        <ul className='flex gap-x-6'>
          <li className='cursor-pointer hover:text-tertiary'>Home</li>
          <li className='cursor-pointer hover:text-tertiary'>Catalogs</li>
          <li className='cursor-pointer hover:text-tertiary'>About</li>
          <li className='cursor-pointer hover:text-tertiary'>Connect us</li>
        </ul>
      </div>
      <ul className='flex items-center gap-x-6'>
        <li>
          <TextInput
            placeholder='Search'
            rightSection={<SearchIcon className='text-primary !w-4 !h-4' />}
          />
        </li>
        {/* <li className='cursor-pointer'>Favourites</li> */}
        <li className='cursor-pointer'>
          <CartIcon className='text-white hover:text-tertiary w-5 h-5' />
        </li>
        <li className='cursor-pointer'>
          <UserIcon className='text-white hover:text-tertiary w-5 h-5' />
        </li>
      </ul>
    </div>
  );
}
