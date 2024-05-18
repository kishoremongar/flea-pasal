import dynamic from 'next/dynamic';
import LandingHero from './hero';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const Categories = dynamic(() => import('./categories'), {
  loading: () => <PageLoadingOverlay />,
});

export default function HomeMainLayout() {
  return (
    <div className='pt-[calc(76px-1rem)]'>
      <LandingHero />
      <Categories />
    </div>
  );
}
