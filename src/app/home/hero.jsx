import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
// import required modules
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import HeroSlide1 from '@@/assets/images/hero_slide1.webp';
import HeroSlide2 from '@@/assets/images/hero_slide2.webp';
import HeroSlide3 from '@@/assets/images/hero_slide3.webp';

export default function LandingHero() {
  const swiperData = [
    {
      id: 1,
      image: HeroSlide1,
      title: 'The joy of dressing is an Art.',
      subtitle: '🌍 Vintage - Thrifted - New Clothes',
    },
    {
      id: 2,
      image: HeroSlide2,
      // title: 'Clothes mean nothing until someone lives in them.',
      title: 'Fashion with a History.',
      subtitle: '🌍 Vintage - Thrifted - New Clothes',
    },
    {
      id: 3,
      image: HeroSlide3,
      title: 'Reduce, Reuse, Recycle',
      subtitle: '🌍 Vintage - Thrifted - New Clothes',
    },
  ];
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay, Thumbs]}
        className='heroSwipperMain max-h-[calc(100vh-76px)] text-white'
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {swiperData?.map((item) => (
          <SwiperSlide key={item?.id}>
            <Image
              className='bg-cover brightness-50 relative'
              src={item?.image}
              alt={item?.title}
            />
            <div className='absolute top-[30%] right-0 left-0 flex flex-col justify-center items-center text-white'>
              <p className='font-extrabold text-6xl text-center'>
                {item?.title}
              </p>
              <p className='font-light text-center text-2xl'>
                {item?.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
