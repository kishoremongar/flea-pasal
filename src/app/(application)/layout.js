'use client';

export default function AppLayout({ children }) {
  return (
    <div className='pt-[4.75rem] md:pt-24 p-5 sm:p-7 md:p-10 bg-off-white'>
      {children}
    </div>
  );
}
