'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-y-4'>
      <div className='text-light-black-primary text-sm flex flex-col items-center'>
        <p>Oops!</p>
        <p>Page not found.</p>
      </div>

      <Button
        onClick={() => router.push('/')}
        size='lg'
        classNames={{
          label: `text-light-primary dark:text-dark-primary text-lg font-normal`,
          root: `!bg-light-secondary dark:bg-dark-secondary hover:!bg-light-secondary/75 rounded-md !px-16 h-16`,
        }}
      >
        Return Home
      </Button>
    </div>
  );
}
