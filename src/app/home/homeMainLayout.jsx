import Categories from './categories';
import LandingHero from './hero';

export default function HomeMainLayout() {
  return (
    <div className='pt-[calc(76px-1rem)]'>
      <LandingHero />
      <Categories />
    </div>
  );
}
