import Categories from './categories';
import LandingHero from './hero';

export default function HomeMainLayout() {
  return (
    <div>
      <LandingHero />
      <Categories />
    </div>
  );
}
