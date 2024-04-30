'use client';

import Image from 'next/image';
import BasketIcon from '@@/assets/icons/basket.svg';
import PrimaryButton from '@/components/common/primaryButton';

export default function ShoppingCartMain() {
  return (
    <div className='bg-off-white flex-auto'>
      <div className='container mx-auto grid grid-cols-3 grid-flow-row gap-4 h-full p-10'>
        <div className='col-span-2 bg-white rounded shadow p-8'>
          {/* <!--  ToastBar  --> */}
          <div className='w-full bg-off-white text-yellow-900 px-4 py-2 flex items-center gap-x-2'>
            <BasketIcon className='w-8 h-8' />
            <div className='text-sm'>
              Congrats you&apos;re eligible for a <b>Coupon Code</b> in this
              order{' '}
            </div>
          </div>
          {/* <!-- Order Summary  --> */}
          <div className='mb-4'>
            <h3 className='text-primary-black text-xl mt-4 font-bold'>
              Order Summary
            </h3>
            {/* <!--     BOX     --> */}
            <div className='border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap bg-white hover:shadow-lg'>
              <Image
                src='https://res.cloudinary.com/fushigina-shinobi/image/upload/v1652717957/samples/ecommerce/analog-classic.jpg'
                className='w-12'
                height={48}
                width={48}
                alt='item2'
              />
              <div className='w-2/3'>
                <h3 className='text-primary-black text-lg font-medium'>
                  Black Jacket XL
                </h3>
                <p className='text-gray-600 text-xs'>
                  Sold by <b>Aashir Khan</b>
                </p>
                <h4 className='text-red-700 text-xs font-bold mt-1'>
                  Only 2 left in stock
                </h4>
              </div>
              <div>
                <h4 className='text-3xl font-medium'>
                  <sup className='text-lg text-olive'>$</sup> 89
                </h4>
                <h5 className='text-sm font-bold text-red-500'>60% OFF</h5>
              </div>
              <div className='w-full flex justify-between mt-4'>
                <button className='text-red-700 hover:bg-red-100 px-2'>
                  DELETE
                </button>
                <label
                  className='block uppercase tracking-wide text-olive'
                  for='grid-first-name'
                >
                  QTY
                  <select
                    className='ml-3 text-sm bg-olive border border-purple-200 text-white p-2 rounded leading-tight'
                    id='grid-state'
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            </div>
            <div className='border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap bg-white hover:shadow-lg'>
              <Image
                src='https://res.cloudinary.com/fushigina-shinobi/image/upload/v1652717972/samples/ecommerce/leather-bag-gray.jpg'
                className='w-12'
                height={48}
                width={48}
                alt='item3'
              />
              <div className='w-2/3'>
                <h3 className='text-primary-black text-lg font-medium'>Bag</h3>
                <p className='text-gray-600 text-xs'>
                  Sold by <b>Taha Dildar</b>
                </p>
                <h4 className='text-red-700 text-xs font-bold mt-1'>
                  Only 1 left in stock
                </h4>
              </div>
              <div>
                <h4 className='text-3xl font-medium'>
                  <sup className='text-lg text-olive'>$</sup> 20
                </h4>
                <h5 className='text-sm font-bold text-red-500'>40% OFF</h5>
              </div>
              <div className='w-full flex justify-between mt-4'>
                <button className='text-red-700 hover:bg-red-100 px-2'>
                  DELETE
                </button>
                <label
                  className='block uppercase tracking-wide text-olive'
                  for='grid-first-name'
                >
                  QTY
                  <select
                    className='ml-3 text-sm bg-olive border border-purple-200 text-white p-2 rounded leading-tight'
                    id='grid-state'
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <PrimaryButton rootClassName='!h-14' titleClassName='!text-base'>
              Proceed to checkout
            </PrimaryButton>
          </div>
        </div>
        <div className='col-span-1 flex flex-col w-full h-full bg-white rounded shadow'>
          <div className='w-full px-8 py-6 p-2'>
            <h3 className='text-primary-black text-2xl mt-4 font-bold'>
              Price Breakdown
            </h3>
            <div className='flex flex-col gap-y-3'>
              <div className='flex justify-between'>
                <div className='text-xl text-orange-900 font-bold'>Amount</div>
                <div className='text-xl text-right font-bold '>$102</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-xl text-orange-900 font-bold'>
                  VAT (15%)
                </div>
                <div className='text-xl text-right font-bold'>$12</div>
              </div>
              <div className='bg-primary h-[2px] w-full'></div>
              <div className='flex justify-between'>
                <div className='text-xl text-orange-900 font-bold'>
                  Total Amount
                </div>
                <div className='text-2xl text-orange-900 font-bold'>$114</div>
              </div>
              <div className='flex justify-center'>
                <PrimaryButton
                  rootClassName='!h-14'
                  titleClassName='!text-base'
                >
                  Checkout
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className='px-10 py-6 w-full flex flex-col flex-wrap justify-center'>
            <div className='pr-8'>
              <h3 className='text-2xl mt-4 font-bold text-olive'>
                Thank You, Kishore
              </h3>
              <h4 className='text-sm text-gray-600 font-bold'>ORDER #5624</h4>
            </div>
            <BasketIcon className='w-8 h-8' />
          </div>
        </div>
      </div>
    </div>
  );
}
