export default function LoadingOverlay() {
  return (
    <div className='flex flex-auto relative'>
      <div
        style={{ backdropFilter: 'blur(50px)' }}
        className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-transparent flex flex-col items-center justify-center'
      >
        <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
        <h2 className='text-center text-olive text-xl font-semibold'>
          Loading...
        </h2>
        <p className='w-1/3 text-center text-olive'>{`This may take a few seconds, please don't close this page.`}</p>
      </div>
    </div>
  );
}
