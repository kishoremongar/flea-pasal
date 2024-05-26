'use client';

import ProfileIcon from '@@/assets/icons/profileCircle.svg';
import OrderIcon from '@@/assets/icons/order.svg';
import FavouriteIcon from '@@/assets/icons/wishlistHeartOutline.svg';
import AddressIcon from '@@/assets/icons/address.svg';
import RatingIcon from '@@/assets/icons/ratingStar.svg';
import PaymentIcon from '@@/assets/icons/paymentCard.svg';
import DeleteIcon from '@@/assets/icons/delete-trash-can.svg';
import HelpIcon from '@@/assets/icons/support.svg';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function UserMainLayout() {
  const iconClass = 'w-4 h-4 text-primary';
  const { data: userData } = useSession();
  const pathName = usePathname();

  const accountNavItems = [
    {
      icon: <ProfileIcon className={iconClass} />,
      text: 'Profile',
      href: '/profile',
      isActive: true,
    },
    {
      icon: <OrderIcon className={iconClass} />,
      text: 'Orders',
      href: '/orders',
      isActive: true,
    },
    {
      icon: <FavouriteIcon className={iconClass} />,
      text: 'Wishlist',
      href: '/wishlist',
      isActive: false,
    },
    {
      icon: <AddressIcon className={iconClass} />,
      text: 'Addresses',
      href: '#',
      isActive: false,
    },
    {
      icon: <RatingIcon className={iconClass} />,
      text: 'My Reviews',
      href: '#',
      isActive: false,
    },
    {
      icon: <PaymentIcon className={iconClass} />,
      text: 'Saved Cards',
      href: '#',
      isActive: false,
    },
    {
      icon: <DeleteIcon className={iconClass} />,
      text: 'Account',
      href: '#',
      isActive: false,
    },
  ];

  const helpNavItems = [
    {
      icon: <HelpIcon className={iconClass} />,
      text: 'Help & Support',
      href: '#',
      isActive: false,
    },
    { text: 'Terms of Use', href: '#', isActive: false },
    { text: 'Privacy policy', href: '#', isActive: false },
  ];

  return (
    <div className='hidden md:flex flex-col min-w-[20%] rounded-md shadow-card'>
      <div className='py-4 px-6'>
        <p className='text-primary capitalize'>
          Namaste! {userData?.user?.name}
        </p>
      </div>
      <div className='mb-10'>
        <h3 className='mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest'>
          Account
        </h3>
        {accountNavItems.map((item, index) => {
          if (item?.isActive) {
            return (
              <Link
                key={index}
                href={item?.href}
                className={`flex gap-x-2 items-center px-6 py-2.5 text-gray-500 hover:underline group ${
                  pathName === item?.href && 'underline'
                }`}
              >
                {item?.icon}
                {item?.text}
              </Link>
            );
          }
          return (
            <button
              key={index}
              disabled={!item?.isActive}
              className='flex gap-x-2 items-center px-6 py-2.5 text-gray-500 cursor-not-allowed group'
            >
              {item?.icon}
              {item?.text}
            </button>
          );
        })}
      </div>
      <div className='mb-10'>
        <h3 className='mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest'>
          HELP
        </h3>
        {helpNavItems.map((item, index) => {
          if (item?.isActive) {
            return (
              <Link
                key={index}
                href={item?.href}
                className='flex gap-x-2 items-center px-6 py-2.5 text-gray-500 hover:underline group'
              >
                {item?.icon}
                {item?.text}
              </Link>
            );
          }
          return (
            <button
              key={index}
              disabled={!item?.isActive}
              className='flex gap-x-2 items-center px-6 py-2.5 text-gray-500 cursor-not-allowed group'
            >
              {item?.icon}
              {item?.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
