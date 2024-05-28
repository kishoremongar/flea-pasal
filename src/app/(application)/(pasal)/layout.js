'use client';

import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import FilterIcon from '@@/assets/icons/mobileFilterSlider.svg';
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
    <div className='flex flex-auto w-full flex-col gap-y-4'>
      <Breadcrumbs
        className='text-olive text-sm sm:text-base'
        classNames={{ separator: '!text-olive' }}
      >
        {breadCrumbItems}
      </Breadcrumbs>
      <div className='grid grid-cols-1 md:grid-cols-12 p-0 lg:p-6 md:gap-x-4'>
        {!params?.productId && (
          <div className='md:block hidden col-span-3 px-4 lg:px-10 bg-white shadow-card rounded-md max-h-[78dvh]'>
            <SidebarFilter />
          </div>
        )}
        <div
          className={`${
            params?.productId ? 'md:col-span-12' : 'md:col-span-9'
          }`}
        >
          {children}
        </div>
      </div>
      {!params?.productId && (
        <div className='md:hidden fixed z-10 bottom-10 right-10 w-10 h-10 flex justify-center items-center bg-white shadow-catShadow rounded-full'>
          <FilterIcon className='w-4 h-4 text-olive' />
        </div>
      )}
    </div>
  );
}
