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
      image: HeroSlide1,
      title: 'The joy of dressing is an Art.',
      subtitle: '🌍 Vintage - Thrifted - New Clothes',
    },
    {
      image: HeroSlide2,
      title: 'Clothes mean nothing until someone lives in them.',
      subtitle: '🌍 Vintage - Thrifted - New Clothes',
    },
    {
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
        className='mySwiper max-h-[calc(100vh-76px)] text-white'
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: true,
        // }}
      >
        {swiperData?.map((item) => (
          <SwiperSlide key={item?.image}>
            <Image className='bg-cover brightness-50' src={item?.image} />
            <div className='absolute left-0 right-0 top-[30%]'>
              <p className='customH1'>{item?.title}</p>
              <p className='customH4 text-2xl'>{item?.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
