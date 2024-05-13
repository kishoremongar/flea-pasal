'use client';

import dynamic from 'next/dynamic';
import LoadingOverlay from '@/components/common/loadingOverlay';

const HomeMainLayout = dynamic(() => import('./home/homeMainLayout'), {
  loading: () => <LoadingOverlay />,
  ssr: false,
});

export default function Home() {
  return <HomeMainLayout />;
}
