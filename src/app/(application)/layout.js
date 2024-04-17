'use client';

import MainNavbar from '@/components/common/navbar';

export default function AppLayout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
