import dynamic from 'next/dynamic';
import LandingHero from './hero';

const Categories = dynamic(() => import('./categories'), {
  ssr: false,
});

export default function HomeMainLayout() {
  return (
    <div className='pt-[calc(76px-1rem)]'>
      <LandingHero />
      <Categories />
    </div>
  );
}
