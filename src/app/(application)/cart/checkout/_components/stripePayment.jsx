import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import usePostStripePayment from '../_hooks/usePostStripePayment';
import CheckoutForm from './checkoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
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
    <div className='flex items-center justify-center'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
