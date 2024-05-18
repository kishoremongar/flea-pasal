'use client';
import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const StripePayment = dynamic(() => import('./_components/stripePayment'), {
  loading: () => <PageLoadingOverlay />,
});

export default function CheckoutPage() {
  return <StripePayment />;
}
