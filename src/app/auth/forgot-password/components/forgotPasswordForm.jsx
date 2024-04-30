'use client';

import { TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import PrimaryButton from '../../../../components/common/primaryButton';
import usePostCreateOTP from '../hooks/usePostCreateOTP';

export default function ForgotPasswordForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  const createOTPMutate = usePostCreateOTP({ email: watch('email') });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = (data) => {
    createOTPMutate.mutate({ email: data.email });
  };

  return (
    <>
      <div className='flex flex-col gap-y-1 text-center'>
        <h2 className='text-tertiary text-[1.625rem] font-bold'>
          Forgot Password?
        </h2>
        <h3 className='text-olive text-lg font-semibold'>
          Enter your email, get a password reset link
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className='flex flex-col gap-y-6'
      >
        <Controller
          name='email'
          control={control}
          rules={{
            required: 'Email is required',
            validate: {
              validateEmail: (email) => validateEmail(email),
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Email Address'
              placeholder='youremail@example.com'
              error={errors.email?.message}
              classNames={{
                label: '!text-base text-olive',
                input: '!h-[2.875rem] !bg-[#F9F9F9] !text-olive',
              }}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <PrimaryButton
          loading={createOTPMutate.isPending}
          rootClassName='!h-14'
          titleClassName='!text-lg'
          type='submit'
        >
          Reset Password
        </PrimaryButton>
        <p className='text-brown2 text-center'>
          Remember your password?{' '}
          <Link href='/auth/login' className='text-olive hover:text-primary'>
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
