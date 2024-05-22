'use client';
import Image from 'next/image';
import dayjs from 'dayjs';
import useGetUserOrders from '../_hooks/useGetUserOrders';

export default function MyOrderList() {
  const { data: userOrderList } = useGetUserOrders();
  return (
    <div className='overflow-hidden w-full'>
      <table className='leading-normal w-full overflow-x-auto'>
        <thead>
          <tr>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Order ID
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Amount
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Ordered on
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Payment
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider'>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {userOrderList?.orders?.map((item, idx) => (
            <tr key={item?._id}>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex sm:flex-row flex-col items-center'>
                  <div className='flex-shrink-0 w-10 h-10'>
                    <Image
                      src={item?.orderItems?.[0]?.image?.[0]}
                      width='0'
                      height='0'
                      alt={item?.orderItems?.[0]?.name}
                      sizes='100vw'
                      className='w-full h-full rounded-full'
                    />
                  </div>
                  <div className='ml-3 text-xs sm:text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item?.orderItems?.length} Items
                    </p>
                    <p className='text-gray-600 whitespace-no-wrap'>
                      00000{idx + 1}
                    </p>
                  </div>
                </div>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-xs sm:text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  &#8377;{item?.total?.toFixed(2)}
                </p>
                <p className='text-gray-600 whitespace-no-wrap'>INR</p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-xs sm:text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                  {dayjs(item?.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className='text-gray-600 whitespace-no-wrap'>
                  Delivery in 7 days
                </p>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-xs sm:text-sm'>
                <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                  <span
                    aria-hidden
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                  ></span>
                  <span className='relative capitalize'>{item?.status}</span>
                </span>
              </td>
              <td className='px-5 py-5 border-b border-gray-200 bg-white text-xs sm:text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>Processing</p>
                <p className='text-gray-600 whitespace-no-wrap'>
                  {dayjs(item?.createdAt).format('MMM DD, YYYY')}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
