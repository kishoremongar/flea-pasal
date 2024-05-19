'use client';
import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const MyOrderList = dynamic(() => import('./_components/myOrderList'), {
  loading: () => <PageLoadingOverlay />,
});

export default function MyOrderPage() {
  return <MyOrderList />;
}
