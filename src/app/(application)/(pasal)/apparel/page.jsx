'use client';

import { useSearchParams } from 'next/navigation';
import PasalFallback from '../_components/pasalFallback';
import useGetAllProducts from '@/app/home/_hooks/getAllProducts';
import PageLoadingOverlay from '@/components/common/pageLoadingOverlay';
import ProductCards from '@/components/common/productCards';
import { filterParams } from '@/utils/filterParams';

export default function ApparelPage() {
  const searchParams = useSearchParams();
  const queryParams = filterParams('apparel', searchParams);
  const { data: getAllApparel, isLoading } = useGetAllProducts(queryParams);

  const checkData =
    getAllApparel?.products?.length > 0 ? (
      getAllApparel?.products?.map((product) => (
        <ProductCards key={product?.id} product={product} pasal='apparel' />
      ))
    ) : (
      <PasalFallback />
    );
  return (
    <div
      className={`${
        !isLoading &&
        getAllApparel?.products?.length > 0 &&
        'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
      }`}
    >
      {isLoading ? <PageLoadingOverlay /> : checkData}
    </div>
  );
}
