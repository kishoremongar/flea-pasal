'use client';

import { Avatar, FileInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CalenderIcon from '@@/assets/icons/calendar-days.svg';
import DownArrowIcon from '@@/assets/icons/selectArrow.svg';
import dayjs from 'dayjs';
import usePostProfile from '../_hooks/usePostProfile';
import useGetUserProfile from '../_hooks/useGetUserProfile';
import PrimaryButton from '@/components/common/primaryButton';

export default function UserProfileLayout() {
  const {
    control,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      birthday: '',
      gender: '',
      apartmentNo: '',
      city: '',
      state: '',
      country: '',
      landmark: '',
      street: '',
      pincode: '',
      profile_picture: '',
    },
  });
  const fileRef = useRef();
  const [avatarPicture, setAvatarPicture] = useState(null);
  const validExtensions = /\.(?<image_extension>png|jpg|jpeg)$/i;

  const handleReset = () => {
    reset();
    clearErrors();
    setValue('profile_picture', '');
    setAvatarPicture(null);
  };

  const { data: userData } = useGetUserProfile();
  const profileMutate = usePostProfile(handleReset);

  const handleProfile = (data) => {
    data['birthday'] = dayjs(data['birthday']).format('YYYY-MM-DD');
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    profileMutate.mutate(formData);
  };

  const handleFileEdit = () => {
    if (fileRef?.current) {
      fileRef?.current?.click();
    }
  };

  useEffect(() => {
    if (!userData) return;
    reset({
      name: userData?.user?.name,
      email: userData?.user?.email,
      phone_number: userData?.user?.phoneNumber,
      birthday: dayjs(userData?.user?.birthday).toDate(),
      profile_picture: userData?.user?.profilePicture,
      gender: userData?.user?.gender,
      city: userData?.user?.addresses[0]?.city,
      state: userData?.user?.addresses[0]?.state,
      country: userData?.user?.addresses[0]?.country,
      landmark: userData?.user?.addresses[0]?.landmark,
      pincode: userData?.user?.addresses[0]?.pincode,
      street: userData?.user?.addresses[0]?.street,
      apartmentNo: userData?.user?.addresses[0]?.apartmentNo,
    });
    setAvatarPicture(userData?.user?.profilePicture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(handleProfile)}
      className='flex flex-col gap-y-4 flex-auto'
    >
      <h2 className='text-olive text-xl font-medium'>My Profile</h2>
      <div className='flex justify-center w-full flex-col items-center'>
        <div className='relative w-32 h-32 rounded-full overflow-hidden'>
          <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center'>
            <Controller
              control={control}
              name='profile_picture'
              render={({ field }) => (
                <>
                  <Avatar
                    radius='2xl'
                    className='!rounded-full !h-32 !w-32'
                    src={avatarPicture}
                  />
                  <FileInput
                    {...field}
                    variant='unstyled'
                    accept='image/png,image/jpeg'
                    ref={fileRef}
                    className='hidden'
                    onChange={(e) => {
                      if (e) {
                        if (!validExtensions.test(e.name)) {
                          setError('profile_picture', {
                            type: 'custom',
                            message: (
                              <p className='text-center'>
                                {e.name} will not be accepted.
                                <br /> Please try with .png, .jpg, .jpeg
                              </p>
                            ),
                          });
                          setAvatarPicture(null);
                          setValue('profile_picture', '');
                        } else if (e?.size <= 500 * 4000) {
                          field.onChange(e);
                          clearErrors('profile_picture');
                          setAvatarPicture(URL.createObjectURL(e));
                        } else {
                          setError('profile_picture', {
                            type: 'custom',
                            message: (
                              <p className='text-center'>
                                File size must be
                                <br /> less than or equal to 2mb.
                              </p>
                            ),
                          });
                        }
                      }
                    }}
                  />
                  <button
                    className='absolute inset-0 bg-gray-500 opacity-80'
                    style={{
                      clipPath:
                        'polygon(0 50%, 0 70%, 100% 70%, 80% 100%, 0 100%)',
                    }}
                    onClick={handleFileEdit}
                    type='button'
                  >
                    <p className='pt-[5.5rem] text-white'>Edit</p>
                  </button>
                </>
              )}
            />
          </div>
        </div>
        {errors?.profile_picture && (
          <p className='text-red-500 text-xs'>
            {errors?.profile_picture?.message}
          </p>
        )}
      </div>
      <div className='grid grid-cols-12 sm:gap-x-6 gap-y-2 justify-center items-center'>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='name'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'Full name is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Full Name'
                placeholder='Enter your full name'
                error={errors?.name?.message}
                withAsterisk
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='email'
            rules={{
              maxLength: {
                value: 100,
                message: 'Maximum length exceded 100 characters',
              },
              required: {
                value: true,
                message: 'Email is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Email'
                placeholder='Enter your email'
                error={errors?.email?.message}
                readOnly
                withAsterisk
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='birthday'
            render={({ field }) => (
              <DateInput
                {...field}
                label='Birth Date'
                rightSection={<CalenderIcon className='w-5 h-5 text-olive' />}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                  rightSection: 'pointer-events-none',
                }}
                placeholder='Enter your birthday'
                maxDate={new Date()}
                valueFormat='YYYY-MM-DD'
              />
            )}
          />
        </div>
      </div>
      <div className='grid grid-cols-12 sm:gap-x-6 gap-y-2 justify-center items-center'>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='phone_number'
            rules={{
              maxLength: {
                value: 15,
                message: 'Maximum length exceded 15 characters',
              },
              required: {
                value: true,
                message: 'Phone number is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Phone number'
                placeholder='Enter your phone number'
                type='number'
                error={errors?.phone_number?.message}
                withAsterisk
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='gender'
            render={({ field }) => (
              <Select
                {...field}
                data={[
                  {
                    value: 'Male',
                    label: 'Male',
                  },
                  {
                    value: 'Female',
                    label: 'Female',
                  },
                  {
                    value: 'Others',
                    label: 'Others',
                  },
                ]}
                placeholder='Select your gender'
                label='Gender'
                rightSection={
                  <DownArrowIcon className='cursor-pointer text-rough-asphalt hover:text-primary w-4 h-4' />
                }
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                  rightSection: 'pointer-events-none w-8 h-8',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='apartmentNo'
            rules={{
              maxLength: {
                value: 20,
                message: 'Maximum length exceded 20 characters',
              },
              required: {
                value: true,
                message: 'Apartment is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your apartment'
                label='Apartment'
                error={errors?.apartmentNo?.message}
                withAsterisk
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                }}
              />
            )}
          />
        </div>
      </div>
      <div className='grid grid-cols-12 sm:gap-x-6 gap-y-2 justify-center items-center'>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='pincode'
            rules={{
              maxLength: {
                value: 10,
                message: 'Maximum length exceded 10 characters',
              },
              required: {
                value: true,
                message: 'Pincode is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your pincode'
                label='Pincode'
                withAsterisk
                error={errors?.pincode?.message}
                type='number'
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='landmark'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'Landmark is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your landmark'
                label='Landmark'
                withAsterisk
                error={errors?.landmark?.message}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='street'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'Street is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your street'
                label='Street'
                withAsterisk
                error={errors?.street?.message}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive ',
                }}
              />
            )}
          />
        </div>
      </div>
      <div className='grid grid-cols-12 sm:gap-x-6 gap-y-2 justify-center items-center'>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='city'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'City is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your city'
                label='City'
                withAsterisk
                error={errors?.city?.message}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='state'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'State is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your state'
                label='State'
                withAsterisk
                error={errors?.state?.message}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive',
                }}
              />
            )}
          />
        </div>
        <div className='sm:col-span-4 col-span-12'>
          <Controller
            control={control}
            name='country'
            rules={{
              maxLength: {
                value: 50,
                message: 'Maximum length exceded 50 characters',
              },
              required: {
                value: true,
                message: 'Country is required',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder='Enter your country'
                label='Country'
                withAsterisk
                error={errors?.country?.message}
                classNames={{
                  input: '!h-[2.75rem]',
                  label: '!mb-1 !text-artists-charcoal !text-olive',
                }}
              />
            )}
          />
        </div>
      </div>
      <div className='flex justify-center w-full items-center'>
        <PrimaryButton rootClassName='!w-fit' type='submit'>
          Save
        </PrimaryButton>
      </div>
    </form>
  );
}
