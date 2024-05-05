'use client';

import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import SidebarFilter from './_components/sidebarFilter';

export default function PasalLayout({ children }) {
  const pathName = usePathname();
  const params = useParams();

  const breadCrumbItems = [
    { id: 1, title: 'Home', href: '/' },
    {
      id: 2,
      title: pathName.split('/')?.[1],
      href: `/${pathName.split('/')?.[1]}`,
    },
  ].map((item) =>
    item?.title === 'Home' || params?.productId ? (
      <Link
        href={item.href}
        key={item?.id}
        className='hover:underline hover:text-secondary'
      >
        {item.title}
      </Link>
    ) : (
      <p key={item?.id}>{item.title}</p>
    )
  );
  return (
    <div className='pt-[4.75rem] md:pt-24 p-5 sm:p-7 md:p-10 flex flex-auto w-full flex-col gap-y-4'>
      <Breadcrumbs
        className='text-olive text-sm sm:text-base'
        classNames={{ separator: '!text-olive' }}
      >
        {breadCrumbItems}
      </Breadcrumbs>
      <div className='grid grid-cols-1 sm:grid-cols-12 p-0 md:p-6 sm:gap-x-4'>
        {!params?.productId && (
          <div className='sm:block hidden col-span-3'>
            <SidebarFilter />
          </div>
        )}
        <div
          className={`${
            params?.productId ? 'sm:col-span-12' : 'sm:col-span-9'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
