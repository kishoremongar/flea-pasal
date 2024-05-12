'use client';

import BasketIcon from '@@/assets/icons/basket.svg';
import EmptyCart from '@@/assets/icons/emptyCart.svg';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartProduct from './cartProduct';
import PrimaryButton from '@/components/common/primaryButton';

export default function ShoppingCartMain() {
  const cartData = useSelector((store) => store?.cartItems?.cartData);
  const [cartItemData, setCartItemData] = useState([]);
  const { data: userData, status } = useSession();
  const router = useRouter();
  const deliveryFee = cartItemData?.itemTotalAmount > 1000 ? 0 : 149;
  const itemTotalAmount = cartItemData?.itemTotalAmount?.toFixed(2);
  const totalAmount =
    itemTotalAmount > 1000
      ? cartItemData?.totalAmount - 149
      : cartItemData?.totalAmount;
  const isLoggedIn = status === 'authenticated';
  const isCartEmpty = cartItemData?.helperData?.length === 0;

  useEffect(() => {
    setCartItemData(cartData);
  }, [cartData]);

  return (
    <div className='flex-auto'>
      <div className='container mx-auto grid grid-cols-3 grid-flow-row gap-4 h-full p-10'>
        <div
          className={`bg-white rounded shadow p-8 ${
            isCartEmpty ? 'col-span-3 text-center' : 'col-span-2'
          }`}
        >
          {isCartEmpty ? (
            <div className='flex flex-col gap-y-4 justify-center items-center'>
              <EmptyCart className='w-2/6 h-2/6' />
              <p className='text-sm md:text-xl font-medium text-primary'>
                Empty cart, please add some products.
              </p>
            </div>
          ) : (
            <>
              <div className='w-full bg-off-white text-yellow-900 px-4 py-2 flex items-center gap-x-2'>
                <BasketIcon className='w-8 h-8' />
                <div className='text-sm'>
                  Congrats you&apos;re eligible for a <b>Coupon Code</b> in this
                  order{' '}
                </div>
              </div>
              <div className='mb-4'>
                <h3 className='text-primary-black text-xl mt-4 font-bold'>
                  Order Summary
                </h3>
                {cartItemData?.helperData?.map((item) => (
                  <CartProduct product={item} key={item?.id} />
                ))}
              </div>
              <div className='flex justify-center'>
                <PrimaryButton
                  onClick={
                    isLoggedIn
                      ? () => router.push('/cart/checkout')
                      : router.push('/auth/login')
                  }
                  rootClassName='!h-14'
                  titleClassName='!text-base'
                >
                  {isLoggedIn ? 'Proceed to checkout' : 'Login'}
                </PrimaryButton>
              </div>
            </>
          )}
        </div>
        {!isCartEmpty && (
          <div className='col-span-1 flex flex-col w-full h-full bg-white rounded shadow'>
            <div className='w-full px-8 py-6 p-2'>
              <h3 className='text-primary-black text-2xl mt-4 font-bold'>
                Price Breakdown
              </h3>
              <div className='flex flex-col gap-y-3'>
                <div className='flex justify-between'>
                  <div className='text-xl text-orange-900 font-bold'>
                    Amount
                  </div>
                  <div className='text-xl text-right font-bold '>
                    &#8377;
                    {itemTotalAmount}
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-xl text-orange-900 font-bold'>
                    Delivery fee
                  </div>
                  <div className='text-xl text-right font-bold'>
                    &#8377;{deliveryFee}
                  </div>
                </div>
                <div className='bg-primary h-[2px] w-full'></div>
                <div className='flex justify-between'>
                  <div className='text-xl text-orange-900 font-bold'>
                    Total Amount
                  </div>
                  <div className='text-2xl text-orange-900 font-bold'>
                    &#8377;{totalAmount}
                  </div>
                </div>
                <div className='flex justify-center'>
                  <PrimaryButton
                    rootClassName='!h-14'
                    titleClassName='!text-base'
                    onClick={
                      isLoggedIn
                        ? () => router.push('/cart/checkout')
                        : router.push('/auth/login')
                    }
                  >
                    {isLoggedIn ? 'Proceed to checkout' : 'Login'}
                  </PrimaryButton>
                </div>
              </div>
            </div>
            <div className='px-10 py-6 w-full flex items-center capitalize flex-wrap justify-center'>
              <div className='pr-8'>
                <h3 className='text-2xl mt-4 font-bold text-olive'>
                  Thank You{isLoggedIn && `, ${userData?.user?.name}`}
                </h3>
                {/* <h4 className='text-sm text-gray-600 font-bold'>ORDER #5624</h4> */}
              </div>
              <BasketIcon className='w-8 h-8' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
