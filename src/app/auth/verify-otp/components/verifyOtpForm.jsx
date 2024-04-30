'use client';

import { PinInput } from '@mantine/core';
import { useState } from 'react';
import usePostCreateOTP from '../../forgot-password/hooks/usePostCreateOTP';
import usePostVerifyOtp from '../hooks/usePostVerifyOtp';
import PrimaryButton from '../../../../components/common/primaryButton';

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState('');
  const isOtpEntered = otp.length === 4;
  const email = typeof window !== 'undefined' && localStorage.getItem('email');
  const postReset = usePostCreateOTP({ email });
  const verifyOtp = usePostVerifyOtp({ otp }, setOtp);

  const handleReset = () => {
    postReset.mutate({ email });
    setOtp('');
  };

  const handleVerifyOtp = () => {
    if (isOtpEntered) {
      verifyOtp.mutate({ email, otp });
    }
  };

  return (
    <>
      <div className='flex flex-col gap-y-1 text-center'>
        <h2 className='text-tertiary text-[1.625rem] font-bold'>OTP</h2>
        <h3 className='text-olive text-lg font-semibold'>
          A unique 4-digit code has been sent to your registered email address.
        </h3>
      </div>
      <div className='flex flex-col gap-y-6'>
        <PinInput
          length={4}
          placeholder=''
          size='xl'
          classNames={{
            root: '!mx-auto !gap-x-6 mb-2 mobile:!gap-x-0',
            input:
              '!h-[4.375rem] !w-[4.375rem] mobile:!w-12 mobile:!h-8 !bg-[#F9F9F9] !text-olive',
          }}
          type={/^[0-9]*$/}
          inputType='tel'
          inputMode='numeric'
          value={otp}
          onChange={(e) => setOtp(e)}
        />
        <PrimaryButton
          loading={verifyOtp.isPending}
          rootClassName='!h-14'
          titleClassName='!text-lg'
          onClick={handleVerifyOtp}
        >
          Verify
        </PrimaryButton>
        <p className='text-brown2 text-center'>
          Not yet received?{' '}
          <button
            className='text-olive hover:text-primary cursor-pointer'
            onClick={handleReset}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </>
  );
}
