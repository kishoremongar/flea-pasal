'use client';

import useGetAllProducts from '@/app/home/_hooks/getAllProducts';
import ProductCards from '@/components/common/productCards';

export default function KraftsPage() {
  const { data: getAllApparel } = useGetAllProducts({ category: 'krafts' });
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {getAllApparel?.products?.map((product) => (
        <ProductCards key={product?.id} product={product} />
      ))}
    </div>
  );
}
