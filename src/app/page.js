'use client';

import HomeMainLayout from './home/homeMainLayout';
import MainNavbar from '@/components/common/navbar';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <MainNavbar />
      <HomeMainLayout />
    </main>
  );
}
