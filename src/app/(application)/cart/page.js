'use client';
import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const ShoppingCartMain = dynamic(() => import('./components/shoppingCart'), {
  ssr: false,
  loading: () => <PageLoadingOverlay />,
});

export default function ShoppingCartPage() {
  return <ShoppingCartMain />;
}
