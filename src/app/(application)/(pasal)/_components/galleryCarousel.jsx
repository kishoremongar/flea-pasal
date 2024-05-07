import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

export default function GalleryCarousel({ imageArray }) {
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
        {imageArray?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`${img}${idx}`}
              width='0'
              height='0'
              sizes='100vw'
              className='w-full md:h-80 h-56 object-cover rounded-t-md'
            />
          </SwiperSlide>
        ))}
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
        {imageArray?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`${img}${idx}`}
              width='0'
              height='0'
              sizes='100vw'
              className='w-28 md:w-40 h-full object-contain rounded-md'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
