import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/effect-creative';
import 'swiper/scss/pagination';
import AddBag from '@@/assets/icons/addBag.svg';

export default function ProductCards({ product }) {
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
      <div className='px-4 py-3'>
        <span className='text-gray-400 mr-3 uppercase text-xs'>
          {product?.company}
        </span>
        <p className='text-lg text-black truncate block capitalize'>
          {product?.name}
        </p>
        <div className='flex items-center'>
          <p className='text-lg font-semibold text-black cursor-auto my-3'>
            &#8377;{product?.price}
          </p>
          <del>
            <p className='text-sm text-gray-600 cursor-auto ml-2'>&#8377;500</p>
          </del>
          <div className='ml-auto cursor-pointer'>
            <AddBag className='hover:text-primary' />
          </div>
        </div>
      </div>
    </div>
  );
}
