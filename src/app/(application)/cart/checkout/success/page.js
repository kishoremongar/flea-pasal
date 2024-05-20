'use client';

import Link from 'next/link';
import ConfirmPayment from '@@/assets/icons/confirm_order.svg';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import usePostOrder from '../_hooks/usePostOrder';
import { getShippingFee } from '@/utils/getShippingFee';
import { getTotalCartItems } from '@/store/slices/cart';

export default function PaymentSuccessPage() {
  const orderMutate = usePostOrder();
  const cartData = useSelector((store) => store?.cartItems?.cartData);
  const searchParams = useSearchParams();
  const totalCartItems = useSelector(getTotalCartItems);

  useEffect(() => {
    if (
      totalCartItems === 0 ||
      searchParams?.get('redirect_status') !== 'succeeded'
    ) {
      return;
    }
    const shippingFee = getShippingFee(cartData?.itemTotalAmount);
    orderMutate.mutate({
      items: cartData?.helperData,
      shippingFee,
      clientSecret: searchParams?.get('payment_intent_client_secret'),
      paymentIntentId: searchParams?.get('payment_intent'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get('redirect_status')]);

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
