'use client';

import Link from 'next/link';
import ConfirmPayment from '@@/assets/icons/confirm_order.svg';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className='flex flex-col gap-y-4 justify-center items-center flex-auto h-auto w-full'>
      <ConfirmPayment className='mobile-xl:w-3/6 mobile-xl:h-3/6' />
      <h2 className='text-sm md:text-xl font-medium text-primary'>
        Order placed successfully!!!
      </h2>
      <Link
        href='/apparel'
        className='text-center text-white bg-primary hover:bg-primary/75 w-fit py-2 px-8 rounded-md text-sm sm:text-base'
      >
        Continue shopping
      </Link>
    </div>
  );
}
