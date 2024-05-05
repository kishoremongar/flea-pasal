'use client';

import { PasswordInput, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';
import EyeClose from '../../../../../public/assets/icons/eyeCloseSecondary.svg';
import EyeOpen from '../../../../../public/assets/icons/eyeOpenSecondary.svg';
import PrimaryButton from '../../../../components/common/primaryButton';
import usePostSignUp from '../hooks/usePostVerifyOtp';

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      re_enter_password: '',
    },
  });

  const registerMutation = usePostSignUp(reset);

  const handleSignIn = (data) => {
    delete data.re_enter_password;
    registerMutation.mutate(data);
  };

  return (
    <>
      <div className='flex flex-col text-center'>
        <h2 className='text-tertiary text-[1.625rem] font-bold'>Sign up</h2>
        <h3 className='text-olive text-md font-semibold'>
          {registerMutation.isSuccess
            ? 'Please check your email to verify'
            : 'It&apos;s quick and easy.'}
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className='flex flex-col gap-y-6'
      >
        <Controller
          name='name'
          control={control}
          rules={{
            required: 'Full name is required',
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Full name'
              placeholder='Your name'
              error={errors?.name?.message}
              classNames={{
                label: '!text-base text-olive text-olive',
                input: '!h-[2.875rem] !bg-[#F9F9F9] text-olive !text-olive',
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
            <PasswordInput
              {...field}
              error={errors?.password?.message}
              placeholder='Enter your password'
              classNames={{
                label: '!text-base text-olive',
                input: '!h-[2.875rem] !bg-[#F9F9F9] !text-olive',
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
          )}
        />
        <PrimaryButton
          loading={registerMutation?.isPending}
          rootClassName='!h-14'
          titleClassName='!text-lg'
          type='submit'
        >
          Sign up
        </PrimaryButton>
        <div href='/auth/login' className='text-brown2 text-center'>
          Already have an account?{' '}
          <Link href='/auth/login' className='text-olive hover:text-primary'>
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
