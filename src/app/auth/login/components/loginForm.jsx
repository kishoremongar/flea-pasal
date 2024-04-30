'use client';

import { PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import EyeClose from '../../../../../public/assets/icons/eyeCloseSecondary.svg';
import EyeOpen from '../../../../../public/assets/icons/eyeOpenSecondary.svg';
import PrimaryButton from '../../../../components/common/primaryButton';
import { ErrorToast } from '../../../../services/toasterServices';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const [signinLoading, setSigninLoading] = useState(false);

  const handleSignIn = (data) => {
    setSigninLoading(true);

    signIn('user-login', {
      email: data.email,
      password: data.password,
      // re_login: true,
      redirect: false,
    })
      .then((res) => {
        if (res.error) {
          if (res.error.startsWith('Cannot read properties of undefined')) {
            ErrorToast({ text: 'Something went wrong' });
            return;
          }
          const errData = JSON.parse(res.error);
          if (errData?.message.password) {
            setError('password', { message: 'Password is incorrect' });
          } else if (errData?.message.email) {
            setError('email', { message: 'Email is incorrect' });
          }
          // if (errData?.message === 'user have active session') {
          //   open active session tab
          // }
          // if (errData?.message !== 'user have active session') {
          //   throw error
          // }
        } else {
          setSigninLoading(false);
        }
      })
      .catch((err) => {
        if (err?.response?.data) {
          ErrorToast({ text: 'Something went wrong' });
        } else {
          return null;
        }
      })
      .finally(() => {
        setSigninLoading(false);
      });
  };

  return (
    <>
      <div className='flex flex-col gap-y-1 text-center'>
        <h2 className='text-tertiary text-[1.625rem] font-bold'>Login</h2>
        <h3 className='text-olive text-lg font-semibold'>Access to thrift</h3>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className='flex flex-col gap-y-6'
      >
        <Controller
          name='email'
          control={control}
          rules={{
            required: 'Email is required',
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
        <Controller
          name='password'
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field }) => (
            <div className='flex flex-col'>
              <div className='flex justify-between items-center'>
                <p className='text-olive font-medium'>Password</p>
                <Link
                  href='/auth/forgot-password'
                  className='text-olive hover:text-primary text-xs md:text-base text-center cursor-pointer'
                >
                  Forgot password?{' '}
                </Link>
              </div>
              <PasswordInput
                {...field}
                error={errors.password?.message}
                placeholder='Enter your password'
                classNames={{
                  label: '!text-base text-olive',
                  input: '!h-[2.875rem] !bg-[#F9F9F9] !text-olive',
                  visibilityToggle: '!mr-6',
                }}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOpen /> : <EyeClose />
                }
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </div>
          )}
        />
        <PrimaryButton
          loading={signinLoading}
          rootClassName='!h-14'
          titleClassName='!text-lg'
          type='submit'
        >
          Login
        </PrimaryButton>
        <div className='text-olive text-center'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/sign-up' className='text-olive hover:text-primary'>
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
