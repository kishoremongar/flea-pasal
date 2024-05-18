import Loading from '@@/assets/icons/loadingGlobal.svg';

export default function PageLoadingOverlay() {
  return (
    <div className='flex flex-auto w-full h-full bg-off-white flex-col items-center justify-center animate-pulse gap-y-6 py-20'>
      <Loading className='w-full h-auto mobile-xl:w-1/4 mobile-xl:h-1/4' />
      <h2 className='text-center text-olive text-base md:text-xl font-semibold'>
        Hang tight...
        <br />
        <span className='text-sm md:text-base text-center text-olive'>{`We're preparing your content.`}</span>
      </h2>
    </div>
  );
}
