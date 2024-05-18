import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import StripeLogo from '@@/assets/icons/stripe.svg';
import { ErrorToast, SuccessToast } from '@/services/toasterServices';
import PrimaryButton from '@/components/common/primaryButton';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentElementLoaded, setPaymentElementLoaded] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          localStorage.clear();
          SuccessToast('Payment successful.');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        case 'requires_action':
          ErrorToast({ text: 'Please use a different card.' });
          setMessage('International transactions are not supported.');
          break;
        default:
          ErrorToast({ text: 'Something went wrong.' });
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://flea-pasal.vercel.app/cart/checkout/success',
        payment_method: 'card',
      },
    });

    if (['card_error', 'validation_error'].includes(error?.type)) {
      setMessage(error.message);
      ErrorToast({ text: error.message });
    } else if (error?.type === 'invalid_request_error') {
      setMessage('International transactions are not supported.');
      ErrorToast({ text: error.message });
    } else {
      setMessage('An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center items-center min-h-[55vh]'
    >
      <div className='flex md:flex-row flex-col gap-y-6 md:gap-x-10 flex-auto items-center'>
        {paymentElementLoaded && (
          <StripeLogo className='mobile-xl:w-2/4 mobile-xl:h-2/4' />
        )}
        <div className='flex flex-col gap-y-8 justify-center items-center  mx-auto my-0'>
          <PaymentElement
            options={paymentElementOptions}
            onLoaderStart={() => setPaymentElementLoaded(false)}
            onReady={() => setPaymentElementLoaded(true)}
          />
          {paymentElementLoaded && (
            <PrimaryButton
              disabled={isLoading || !stripe || !elements}
              type='submit'
              titleClassName='!font-normal'
              loading={isLoading}
              loaderProps={{ type: 'dots' }}
              rootClassName='!w-full'
            >
              {isLoading ? (
                <div className='spinner loader'>Loading...</div>
              ) : (
                'Pay now'
              )}
            </PrimaryButton>
          )}
          {message && (
            <div className='text-xs md:text-sm font-medium text-primary'>
              {message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
