'use client';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/common/primaryButton';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center flex-auto gap-y-4'>
      <div className='text-light-black-primary text-center text-sm flex flex-col items-center w-full'>
        <div className='bg-404Bg w-full h-[25rem] bg-center'>
          <h1 className='text-center text-5xl md:text-7xl text-olive'>404</h1>
        </div>
        <div className='text-secondary -mt-6'>
          <h3 className='text-xl md:text-3xl'>{`Look like you're lost`}</h3>
          <p>the page you are looking for is not avaible!</p>
        </div>
      </div>
      <PrimaryButton
        onClick={() => router.push('/')}
        titleClassName='!text-sm md:!text-base !font-normal'
      >
        Return Home
      </PrimaryButton>
    </div>
  );
}
