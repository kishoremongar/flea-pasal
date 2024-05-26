'use client';

import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const UserMainLayout = dynamic(() => import('./_components/userMainLayout'), {
  loading: () => <PageLoadingOverlay />,
});

export default function UserLayout({ children }) {
  return (
    <div className='flex w-full rounded-md bg-white shadow-card'>
      <UserMainLayout />
      <div className='px-8 py-4 flex flex-auto'>{children}</div>
    </div>
  );
}
