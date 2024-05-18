'use client';

export default function AppLayout({ children }) {
  return (
    <div className='pt-24 pb-12 px-5 md:px-10 bg-off-white flex flex-auto h-full'>
      {children}
    </div>
  );
}
