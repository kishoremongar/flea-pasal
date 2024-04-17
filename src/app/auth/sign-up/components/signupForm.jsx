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

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      re_enter_password: '',
    },
  });

  const [signinLoading, setSigninLoading] = useState(false);

  const handleSignIn = (data) => {
    setSigninLoading(true);

    signIn('user-login', {
      email: data.email,
      password: data.password,
      re_login: true,
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
      <div className='flex flex-col text-center'>
        <h2 className='text-brown3 text-[1.625rem] font-bold'>Sign up</h2>
        <h3 className='text-brown4 text-md font-semibold'>
          It&apos;s quick and easy.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className='flex flex-col gap-y-6'
      >
        <Controller
          name='full_name'
          control={control}
          rules={{
            required: 'Full name is required',
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Full name'
              placeholder='Your name'
              error={errors?.full_name?.message}
              classNames={{
                label: '!text-base text-brown3 text-brown3',
                input: '!h-[2.875rem] !bg-[#F9F9F9] text-brown3 !text-brown3',
              }}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
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
              error={errors?.email?.message}
              classNames={{
                label: '!text-base text-brown3',
                input: '!h-[2.875rem] !bg-[#F9F9F9] !text-brown3',
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
            <PasswordInput
              {...field}
              error={errors?.password?.message}
              placeholder='Enter your password'
              classNames={{
                label: '!text-base text-brown3',
                input: '!h-[2.875rem] !bg-[#F9F9F9] !text-brown3',
                visibilityToggle: '!mr-6',
              }}
              label='Password'
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <EyeOpen /> : <EyeClose />
              }
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='re_enter_password'
          control={control}
          rules={{
            required: 'Confrim password is required',
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              error={errors?.re_enter_password?.message}
              placeholder='Confirm your password'
              label='Confirm password'
              classNames={{
                label: '!text-base text-brown3',
                input: '!h-[2.875rem] !bg-[#F9F9F9] !text-brown3',
                visibilityToggle: '!mr-6',
              }}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <EyeOpen /> : <EyeClose />
              }
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
        <PrimaryButton
          loading={signinLoading}
          rootClassName='!h-14'
          titleClassName='!text-xl'
          type='submit'
        >
          Sign up
        </PrimaryButton>
        <div href='/auth/login' className='text-brown2 text-center'>
          Already have an account?{' '}
          <Link href='/auth/login' className='text-brown4 hover:text-primary'>
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
