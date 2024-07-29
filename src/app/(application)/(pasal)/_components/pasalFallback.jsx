import NoDataFound from '@@/assets/icons/noDataFound.svg';

export default function PasalFallback() {
  return (
    <main className='flex flex-auto w-full h-full bg-off-white flex-col items-center justify-center gap-y-6 py-20'>
      <NoDataFound className='w-full h-auto mobile-xl:w-2/4 mobile-xl:h-2/4' />
      <h2 className='text-center text-olive text-base md:text-xl font-semibold'>
        No data found...
      </h2>
    </main>
  );
}
