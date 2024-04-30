import LandingHero from './hero';

export default function HomeMainLayout() {
  return (
    <div>
      <LandingHero />
      <Categories />
    </div>
  );
}

const Categories = () => {
  return <div className='min-h-screen text-center'>Shop by categories</div>;
};
