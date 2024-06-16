'use client';
import dayjs from 'dayjs';
import Image from 'next/image';
import EmptyCart from '@@/assets/icons/emptyCart.svg';
import useGetUserOrders from '../_hooks/useGetUserOrders';

export default function OrderHistory() {
  const { data: userOrderList } = useGetUserOrders();
  return (
    <div className='flex flex-auto w-full flex-col gap-y-4'>
      <h2 className='text-olive text-xl font-medium'>My Orders #</h2>
      {userOrderList?.orders?.length > 0 ? (
        userOrderList?.orders?.map((item, idx) => (
          <div
            key={item?._id}
            className={`grid grid-cols-1 mobile-xl:grid-cols-2 lg:grid-cols-3 place-content-center ${
              userOrderList?.orders?.length - 1 !== idx && 'border-b-2 pb-4'
            }`}
          >
            <div className='flex lg:flex-row flex-col lg:items-center gap-x-2'>
              <div className='flex-shrink-0 w-full h-auto mobile-xl:w-10 mobile-xl:h-10'>
                <Image
                  src={item?.orderItems?.[0]?.image?.[0]}
                  width='0'
                  height='0'
                  alt={item?.orderItems?.[0]?.name}
                  sizes='100vw'
                  className='w-full h-full rounded-md'
                />
              </div>
              <div>
                <div className='text-olive'>#{item?._id?.slice(1, 10)}</div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-stone'>
                    &#8377;{item?.total?.toFixed(2)}
                  </div>
                  <div className='text-olive'>
                    Items:{' '}
                    <span className='text-stone'>
                      {item?.orderItems?.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='text-olive'>
                Status:{' '}
                <span className='text-stone'>
                  Processing - {dayjs(item?.createdAt).format('MMM DD, YYYY')}
                </span>
              </div>
              <div className='text-olive'>
                Payment Status:{' '}
                <span className='relative inline-block px-3 py-1 font-semibold text-tertiary'>
                  <span
                    aria-hidden
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative capitalize text-sm text-stone'>
                    {item?.status}
                  </span>
                </span>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='text-olive'>
                Ordered on:{' '}
                <span className='text-stone'>
                  {dayjs(item?.createdAt).format('MMM DD, YYYY')}
                </span>
              </div>
              <div className='text-olive'>
                Delivery Date:{' '}
                <span className='text-stone'>
                  {dayjs(item?.createdAt).add(7, 'day').format('MMM DD, YYYY')}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='flex flex-col gap-y-4 justify-center items-center'>
          <EmptyCart className='mobile-xl:w-4/6 mobile-xl:h-4/6' />
          <p className='text-sm md:text-xl font-medium text-primary'>
            No order found!!!
            <br />
            Get your first order.
          </p>
        </div>
      )}
    </div>
  );
}
