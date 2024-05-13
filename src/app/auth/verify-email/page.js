'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import VerifyEmailBg from '@@/assets/icons/verifyEmail.svg';
import usePostVerifyEmail from './_hooks/usePostVerifyEmail';
import PrimaryButton from '@/components/common/primaryButton';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyToken = searchParams.get('token');
  const verifyEmail = searchParams.get('email');

  const emailMutate = usePostVerifyEmail();
  useEffect(() => {
    emailMutate.mutate({
      verificationToken: verifyToken,
      email: verifyEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='text-olive text-center flex flex-col gap-y-3'>
      <VerifyEmailBg className='w-full h-full' />
      {emailMutate?.isSuccess ? (
        <>
          <p>Your email is verified</p>
          <PrimaryButton
            rootClassName='!w-fit'
            onClick={() => router.push('/auth/login')}
          >
            Login
          </PrimaryButton>
        </>
      ) : (
        <p className={`${emailMutate?.isPending && 'animate-pulse'}`}>
          Please wait...
          <br />
          We are verifying your email.
        </p>
      )}
    </div>
  );
}
