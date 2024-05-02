'use client';

import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarFilter from './_components/sidebarFilter';

export default function PasalLayout({ children }) {
  const pathName = usePathname();

  const breadCrumbItems = [
    { id: 1, title: 'Home', href: '/' },
    { id: 2, title: 'Pasal', href: '#' },
    {
      id: 3,
      title: pathName.split('/')?.[2],
      href: '#',
    },
  ].map((item) =>
    item?.title === 'Home' ? (
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
    <div className='p-10'>
      <Breadcrumbs
        className='text-olive'
        classNames={{ separator: '!text-olive' }}
      >
        {breadCrumbItems}
      </Breadcrumbs>
      <div className='grid grid-cols-12 p-6'>
        <div className='col-span-3'>
          <SidebarFilter />
        </div>
        <div className='col-span-9'>{children}</div>
      </div>
    </div>
  );
}
