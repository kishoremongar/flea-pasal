import dynamic from 'next/dynamic';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';

const SingleProduct = dynamic(() => import('../../_components/singleProduct'), {
  loading: () => <PageLoadingOverlay />,
});

export default function SingleBookPage() {
  return <SingleProduct />;
}
