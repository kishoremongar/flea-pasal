'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-creative';
import 'swiper/scss/pagination';
import AddBag from '@@/assets/icons/addBag.svg';
import ArrowRightIcon from '@@/assets/icons/arrow-right.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import PrimaryButton from './primaryButton';
import { decrementCartItem, setCartItem } from '@/store/slices/cart';

export default function ProductCards({ product, pasal }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (store) => store?.cartItems?.cartData?.helperData
  );
  const [quantityCount, setQuantityCount] = useState(0);
  const addLimit = 4;
  const router = useRouter();

  const handleAddToCart = () => {
    if (quantityCount === 0) {
      dispatch(setCartItem(product));
      setQuantityCount(1);
    } else {
      router.push('/cart');
    }
  };

  const handleValue = (actionType) => {
    const actions = {
      increment: () => {
        if (quantityCount < addLimit) {
          dispatch(setCartItem(product));
          setQuantityCount((prevCount) => prevCount + 1);
        }
      },
      decrement: () => {
        if (quantityCount > 0) {
          dispatch(decrementCartItem(product));
          setQuantityCount((prevCount) => prevCount - 1);
        }
      },
    };

    actions[actionType]();
  };

  useEffect(() => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setQuantityCount(existingProduct.quantity);
    } else {
      setQuantityCount(0);
    }
  }, [cartItems, product]);

  return (
    <div
      className='bg-white shadow-md hover:shadow-xl duration-300 rounded-md'
      key={product?.id}
    >
      <div>
        <Swiper
          grabCursor={true}
          effect={'creative'}
          pagination={{
            clickable: true,
          }}
          loop={true}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          modules={[Pagination, EffectCreative]}
          style={{
            '--swiper-pagination-color': '#fff',
          }}
          className='productSwipper'
        >
          {product?.image?.map((each, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={each}
                alt='Product'
                width='0'
                height='0'
                sizes='100vw'
                className='w-60 h-64 object-cover rounded-t-md'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='px-4 py-3 w-full'>
        <span className='text-gray-400 mr-3 uppercase text-xxs sm:text-xs'>
          {product?.company}
        </span>
        <Link
          className='text-sm font-bold sm:text-lg text-olive truncate block capitalize'
          href={`/${pasal}/${product?.id}`}
        >
          {product?.name}
        </Link>
        <div className='flex sm:flex-row flex-col sm:items-center items-start w-full'>
          <div className='flex items-center'>
            <p className='text-sm sm:text-lg font-semibold text-olive cursor-auto my-3'>
              &#8377;{product?.price}
            </p>
            <del>
              <p className='text-xs sm:text-sm text-gray-600 cursor-auto ml-2'>
                &#8377;500
              </p>
            </del>
          </div>
          {quantityCount > 0 && (
            <div className='sm:ml-auto mb-4 sm:mb-0 flex items-center sm:w-fit w-full'>
              <button
                className='bg-tertiary text-white font-bold px-2 rounded-l w-full'
                onClick={() => handleValue('decrement')}
              >
                -
              </button>
              <span className='bg-gray-200 px-2 text-primary-black w-full text-center'>
                {quantityCount}
              </span>
              <button
                className='bg-tertiary text-white font-bold px-2 rounded-r w-full'
                onClick={() => handleValue('increment')}
              >
                +
              </button>
            </div>
          )}
        </div>

        <PrimaryButton
          onClick={handleAddToCart}
          rightSection={
            quantityCount > 0 ? (
              <ArrowRightIcon className='w-4 h-4' />
            ) : (
              <AddBag className='w-4 h-4' />
            )
          }
          rootClassName='!w-full !group'
          titleClassName='!text-xs sm:!text-base'
        >
          {quantityCount > 0 ? 'Checkout' : 'Add to cart'}
        </PrimaryButton>
      </div>
    </div>
  );
}
