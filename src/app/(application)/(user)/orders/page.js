'use client';
import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const OrderHistory = dynamic(() => import('./_components/orderHistory'), {
  loading: () => <PageLoadingOverlay />,
});

export default function MyOrderPage() {
  return <OrderHistory />;
}
