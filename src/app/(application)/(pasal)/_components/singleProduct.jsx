'use client';
import { useParams } from 'next/navigation';
import { ColorSwatch } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBag from '@@/assets/icons/addBag.svg';
import ArrowRightIcon from '@@/assets/icons/arrow-right.svg';
import useGetSingleProduct from '../_hooks/getSingleProduct';
import GalleryCarousel from './galleryCarousel';
import PrimaryButton from '@/components/common/primaryButton';
import { decrementCartItem, setCartItem } from '@/store/slices/cart';

export default function SingleProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const { data: getSingleProduct } = useGetSingleProduct(params.productId);
  const cartItems = useSelector(
    (store) => store?.cartItems?.cartData?.helperData
  );
  const [quantityCount, setQuantityCount] = useState(0);
  const addLimit = 4;

  const handleAddToCart = () => {
    dispatch(setCartItem(getSingleProduct?.product));
    setQuantityCount(1);
  };

  const handleValue = (actionType) => {
    const actions = {
      increment: () => {
        if (quantityCount < addLimit) {
          dispatch(setCartItem(getSingleProduct?.product));
          setQuantityCount((prevCount) => prevCount + 1);
        }
      },
      decrement: () => {
        if (quantityCount > 0) {
          dispatch(decrementCartItem(getSingleProduct?.product));
          setQuantityCount((prevCount) => prevCount - 1);
        }
      },
    };

    actions[actionType]();
  };

  useEffect(() => {
    const existingProduct = cartItems.find(
      (item) => item.id === getSingleProduct?.product?.id
    );
    if (existingProduct) {
      setQuantityCount(existingProduct.quantity);
    } else {
      setQuantityCount(0);
    }
     
  }, [cartItems, getSingleProduct?.product]);

  return (
    <div className='antialiased max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row -mx-4'>
        <div className='md:flex-1 px-4 rounded-lg w-full md:w-10'>
          <GalleryCarousel imageArray={getSingleProduct?.product?.image} />
        </div>
        <div className='md:flex-1 px-4 text-olive'>
          <h2 className='mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl'>
            {getSingleProduct?.product?.name}
          </h2>
          <div className='flex items-center gap-x-4 text-secondary text-sm'>
            <p>{getSingleProduct?.product?.company}</p>
            <p>{getSingleProduct?.product?.averageRating}/5</p>
          </div>
          <div className='flex items-center space-x-4 my-4'>
            <div>
              <div className='rounded-lg bg-gray-100 flex py-2 px-3'>
                <span className='text-olive mr-1 mt-1'>&#8377;</span>
                <span className='font-bold text-olive text-3xl'>
                  {getSingleProduct?.product?.price}
                </span>
              </div>
            </div>
            <div className='flex-1'>
              <p className='text-green-500 text-xl font-semibold'>Save 12%</p>
              <p className='text-gray-400 text-sm'>Inclusive of all Taxes.</p>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div>Sizes: {getSingleProduct?.product?.size}</div>
            <div className='flex gap-x-2 items-center'>
              Colors:{' '}
              {getSingleProduct?.product?.colors?.map((col) => (
                <ColorSwatch component='button' color={col} key={col} />
              ))}
            </div>
          </div>
          <div className='flex py-4 space-x-4'>
            <PrimaryButton
              type='button'
              rootClassName='!h-14 !w-full sm:!w-2/6'
              rightSection={
                quantityCount > 0 ? (
                  <ArrowRightIcon className='w-4 h-4' />
                ) : (
                  <AddBag className='w-4 h-4' />
                )
              }
              onClick={handleAddToCart}
              // rootClassName='!w-full !group'
              titleClassName='!text-xs sm:!text-base'
            >
              {quantityCount > 0 ? 'Checkout' : 'Add to cart'}
            </PrimaryButton>
            {quantityCount > 0 && (
              <div className='flex items-center w-fit'>
                <button
                  className='bg-tertiary text-white font-bold px-2 rounded-l w-full h-full'
                  onClick={() => handleValue('decrement')}
                >
                  -
                </button>
                <span className='bg-gray-200 px-2 text-primary-black w-full text-center h-full flex items-center'>
                  {quantityCount}
                </span>
                <button
                  className='bg-tertiary text-white font-bold px-2 rounded-r w-full h-full'
                  onClick={() => handleValue('increment')}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <p>{getSingleProduct?.product?.description}</p>
        </div>
      </div>
    </div>
  );
}
