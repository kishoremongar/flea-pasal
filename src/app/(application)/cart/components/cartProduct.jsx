'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@@/assets/icons/delete-trash-can.svg';
import {
  decrementCartItem,
  removeCartItem,
  setCartItem,
} from '@/store/slices/cart';

export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (store) => store?.cartItems?.cartData?.helperData
  );
  const [quantityCount, setQuantityCount] = useState(0);
  const addLimit = 4;
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
    <div className='border w-full rounded mt-5 flex p-4 justify-between items-center flex-wrap bg-white hover:shadow-lg'>
      <Image
        src={product?.image?.[0]}
        className='w-12'
        height={48}
        width={48}
        alt='item2'
      />
      <div className='w-2/3'>
        <h3 className='text-primary-black text-lg font-medium'>
          {product?.name}
        </h3>
        <p className='text-gray-600 text-xs'>
          Sold by <b>{product?.company}</b>
        </p>
        {/* <h4 className='text-red-700 text-xs font-bold mt-1'>
          Only 2 left in stock
        </h4> */}
      </div>
      <div>
        <h4 className='text-3xl font-medium'>
          <sup className='text-lg text-olive'>&#8377;</sup> {product?.price}
        </h4>
        <h5 className='text-sm font-bold text-red-500'>60% OFF</h5>
      </div>
      <div className='w-full flex justify-between mt-4'>
        <button
          onClick={() => dispatch(removeCartItem(product))}
          className='text-red-700 hover:bg-red-100 px-2 py-1 rounded-md text-sm font-medium border border-[#edebeb] flex gap-x-2'
        >
          <DeleteIcon className='w-4 h-4' /> Remove item
        </button>
        <div className='ml-auto flex items-center w-fit'>
          <button
            className='bg-tertiary text-white font-bold px-2 rounded-l'
            onClick={() => handleValue('decrement')}
          >
            -
          </button>
          <span className='bg-gray-200 px-2 text-primary-black'>
            {quantityCount}
          </span>
          <button
            className='bg-tertiary text-white font-bold px-2 rounded-r'
            onClick={() => handleValue('increment')}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
