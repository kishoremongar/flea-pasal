'use client';
import GalleryCarousel from './galleryCarousel';
import PrimaryButton from '@/components/common/primaryButton';

export default function SingleProduct() {
  return (
    <div className='antialiased max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row -mx-4'>
        <div className='md:flex-1 px-4 rounded-lg w-full md:w-10'>
          <GalleryCarousel />
        </div>
        <div className='md:flex-1 px-4 text-olive'>
          <h2 className='mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl'>
            Lorem ipsum dolor, sit amet consectetur, adipisicing elit.
          </h2>
          <div className='flex items-center gap-x-4 text-secondary text-sm'>
            <p>ABC Company</p>
            <p>3.75k reviews</p>
          </div>
          <div className='flex items-center space-x-4 my-4'>
            <div>
              <div className='rounded-lg bg-gray-100 flex py-2 px-3'>
                <span className='text-olive mr-1 mt-1'>&#8377;</span>
                <span className='font-bold text-olive text-3xl'>2500</span>
              </div>
            </div>
            <div className='flex-1'>
              <p className='text-green-500 text-xl font-semibold'>Save 12%</p>
              <p className='text-gray-400 text-sm'>Inclusive of all Taxes.</p>
            </div>
          </div>
          <div>Sizes:</div>
          <div>Colors:</div>
          <div className='flex py-4 space-x-4'>
            <div className='relative'>
              <div className='text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold'>
                Qty
              </div>
              <select className='cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <svg
                className='w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                />
              </svg>
            </div>
            <PrimaryButton
              type='button'
              rootClassName='!h-14 !w-full sm:!w-2/6'
              titleClassName='!text-white'
            >
              Add to Cart
            </PrimaryButton>
          </div>
          <p>
            Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
            exercitationem porro saepe ea harum corrupti vero id laudantium
            enim, libero blanditiis expedita cupiditate a est.
          </p>
          <p>Product details</p>
        </div>
      </div>
    </div>
  );
}
