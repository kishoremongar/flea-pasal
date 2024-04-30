import {
  Box,
  PasswordInput,
  Popover,
  Progress,
  rem,
  Text,
} from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import EyeClose from '../../../../../public/assets/icons/eyeCloseSecondary.svg';
import EyeOpen from '../../../../../public/assets/icons/eyeOpenSecondary.svg';
import IconCheck from '../../../../../public/assets/icons/correct-success.svg';
import IconX from '../../../../../public/assets/icons/cross-red.svg';
import PrimaryButton from '../../../../components/common/primaryButton';
import usePostChangePassword from '../hooks/usePostChangePassword';

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { new_password: '', re_enter_password: '' },
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const resetPasswordMutation = usePostChangePassword();

  const borderPrimaryColor = '#4CD349';

  function PasswordRequirement({ meets, label }) {
    return (
      <Text
        c={meets ? borderPrimaryColor : 'red'}
        style={{ display: 'flex', alignItems: 'center', padding: '2px 0' }}
        mt={7}
        size='sm'
      >
        {meets ? (
          <IconCheck style={{ width: rem(16), height: rem(16) }} />
        ) : (
          <IconX style={{ width: rem(15), height: rem(15) }} />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  function getStrength(password) {
    let multiplier = password?.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    const mainData = (100 / (requirements.length + 1)) * multiplier;
    return Math.max(100 - mainData, 10);
  }

  const strength = getStrength(watch('new_password'));
  let color;

  if (strength === 100) {
    color = borderPrimaryColor;
  } else if (strength > 50) {
    color = 'yellow';
  } else {
    color = 'red';
  }

  const checks = requirements.map((requirement) => (
    <PasswordRequirement
      key={requirement.label}
      label={requirement.label}
      meets={requirement.re.test(watch('new_password'))}
    />
  ));

  const handleChangePassword = (data) => {
    const { new_password: newPassword } = data;
    const getOtp = typeof window !== 'undefined' && localStorage.getItem('otp');
    const getEmail =
      typeof window !== 'undefined' && localStorage.getItem('email');
    const mainData = {
      email: getEmail,
      otp: getOtp,
      password: newPassword,
    };
    resetPasswordMutation.mutate(mainData);
    reset();
  };

  return (
    <>
      <div className='flex flex-col gap-y-1 text-center'>
        <h2 className='text-tertiary text-[1.625rem] font-bold'>
          Change Password
        </h2>
        <h3 className='text-olive text-lg font-semibold'>
          Reset your password.
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className='flex flex-col gap-y-6'
      >
        <Popover
          opened={popoverOpened}
          position='bottom'
          width='target'
          transitionProps={{ transition: 'pop' }}
        >
          <Popover.Target>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <Controller
                name='new_password'
                control={control}
                rules={{
                  required: 'New password is required',
                }}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    placeholder='Create your new password'
                    label='New password'
                    error={errors?.new_password?.message}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <EyeOpen /> : <EyeClose />
                    }
                    classNames={{
                      label: '!text-base text-olive',
                      input: '!h-[2.875rem] !bg-[#F9F9F9] !text-olive',
                      visibilityToggle: '!mr-6',
                    }}
                  />
                )}
              />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <Progress color={color} value={strength} size={5} mb='xs' />
            <PasswordRequirement
              label='Includes at least 8 characters'
              meets={watch('new_password')?.length > 7}
            />
            {checks}
          </Popover.Dropdown>
        </Popover>
        <Controller
          name='re_enter_password'
          control={control}
          rules={{
            required: 'Password is required',
            validate: (value) =>
              value === watch('new_password') || "Passwords don't match",
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label='Confirm password'
              error={errors.re_enter_password?.message}
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
          )}
        />
        <PrimaryButton
          loading={resetPasswordMutation?.isPending}
          rootClassName='!h-14'
          titleClassName='!text-lg'
          type='submit'
        >
          Update Password
        </PrimaryButton>
      </form>
    </>
  );
}
