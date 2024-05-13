'use client';
import dynamic from 'next/dynamic';
import LoadingOverlay from '@/components/common/loadingOverlay';

const ShoppingCartMain = dynamic(() => import('./components/shoppingCart'), {
  ssr: false,
  loading: () => <LoadingOverlay />,
});

export default function ShoppingCartPage() {
  return <ShoppingCartMain />;
}
