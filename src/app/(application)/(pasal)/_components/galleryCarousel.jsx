import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function GalleryCarousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='flex flex-col gap-y-2 w-full'>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-navigation-size': '22px',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='singleProductSwipper'
      >
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-1.jpg'
            alt='nautre1'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-2.jpg'
            alt='nautre2'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-3.jpg'
            alt='nautre3'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-4.jpg'
            alt='nautre4'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-5.jpg'
            alt='nautre5'
            width='0'
            height='0'
            // sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-6.jpg'
            alt='nautre6'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-7.jpg'
            alt='nautre7'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-8.jpg'
            alt='nautre8'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-9.jpg'
            alt='nautre9'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-10.jpg'
            alt='nautre10'
            width='0'
            height='0'
            sizes='100vw'
            className='w-full md:h-80 h-56 object-cover rounded-t-md'
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={2}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-1.jpg'
            alt='image1'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-2.jpg'
            alt='image2'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-3.jpg'
            alt='image3'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-4.jpg'
            alt='image4'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-5.jpg'
            alt='image5'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-6.jpg'
            alt='image6'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-7.jpg'
            alt='image7'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-8.jpg'
            alt='image8'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-9.jpg'
            alt='image9'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='https://swiperjs.com/demos/images/nature-10.jpg'
            alt='image10'
            width='0'
            height='0'
            sizes='100vw'
            className='w-28 md:w-40 h-full object-contain rounded-md'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
