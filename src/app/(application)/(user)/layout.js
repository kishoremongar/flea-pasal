'use client';

import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const UserMainLayout = dynamic(() => import('./_components/userMainLayout'), {
  loading: () => <PageLoadingOverlay />,
});

export default function UserLayout({ children }) {
  return (
    <div className='flex flex-auto h-full w-full'>
      <UserMainLayout />
      {children}
    </div>
  );
}
