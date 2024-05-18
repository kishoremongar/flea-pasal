import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import LoadingCheckout from '@@/assets/icons/loadingBg.svg';
import usePostStripePayment from '../_hooks/usePostStripePayment';
import CheckoutForm from './checkoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripePayment() {
  const cartData = useSelector((store) => store?.cartItems?.cartData);
  const [clientSecret, setClientSecret] = useState('');

  const deliveryFee = cartData?.itemTotalAmount > 1000 ? 0 : 149;

  const stripePaymentMutation = usePostStripePayment(setClientSecret);
  useEffect(() => {
    if (!cartData) return;
    stripePaymentMutation.mutate({
      shipping_fee: deliveryFee,
      total_amount: Number(cartData?.itemTotalAmount?.toFixed(2)),
      purchase: cartData?.helperData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#93785b',
      colorBackground: '#faf9f6',
      colorText: '#3e362e',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='flex items-center justify-center flex-auto w-full h-auto'>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className='flex flex-col gap-y-4 items-center justify-center w-full pt-10 pb-6'>
          <LoadingCheckout className='mobile-xl:w-2/4 mobile-xl:h-2/4' />
          <p className='text-center text-sm sm:text-xl animate-pulse text-olive'>
            Please wait, this will take a few seconds...
          </p>
        </div>
      )}
    </div>
  );
}
