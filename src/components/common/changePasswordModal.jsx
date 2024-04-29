import {
  Box,
  Modal,
  PasswordInput,
  Popover,
  Progress,
  rem,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { closeChangePasswordModal } from '../../store/slices/auth';
import CloseIcon from '../../../public/assets/icons/closeCross.svg';
import EyeClose from '../../../public/assets/icons/eyeCloseSecondary.svg';
import EyeOpen from '../../../public/assets/icons/eyeOpenSecondary.svg';
import IconCheck from '../../../public/assets/icons/correct-success.svg';
import IconX from '../../../public/assets/icons/cross-red.svg';
import PrimaryButton from './primaryButton';
import usePostPasswordChange from '@/utils/usePostPasswordChange';

export function ChangePasswordModal() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state) => state.auth.changePasswordModal?.status
  );
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: '',
      re_enter_password: '',
      current_password: '',
    },
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const userDetails = useSelector((state) => state.auth.user);

  const handleClose = () => {
    dispatch(closeChangePasswordModal());
    reset();
  };

  const resetPasswordMutation = usePostPasswordChange(handleClose);

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
    let multiplier = password?.length > 7 ? 0 : 1;

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
    delete data.re_enter_password;
    data['id'] = userDetails?.user_id;
    resetPasswordMutation.mutate(data);
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={handleClose}
      centered
      overlayProps={{ blur: 100, opacity: 0.7 }}
      size={'md'}
      radius='md'
      withCloseButton={false}
      classNames={{ body: 'flex flex-col gap-y-4 !px-8' }}
    >
      <button
        onClick={handleClose}
        className={`self-end bg-[#F5F6F7] flex justify-center cursor-pointer hover:bg-primary text-dark-gray1 w-8 h-8 hover:text-white ease-in-out transition-all items-center rounded-full`}
        disabled={resetPasswordMutation?.isPending}
      >
        <CloseIcon className='w-4 h-4' />
      </button>
      <div className='flex justify-center items-center gap-x-2 text-center'>
        <h2 className='text-primary-black text-[1.625rem] font-bold'>
          Change Password
        </h2>
        <Tooltip
          multiline
          w={220}
          withArrow
          transitionProps={{ duration: 200 }}
          className='text-white p-2'
          color='#fb9032'
          label='Should contain at least one lowercase, one uppercase, one numeric, one
          special character and minimum 8-16 characters.'
          events={{ touch: true }}
          // classNames={{tooltip: ""}}
        >
          <div className='bg-[#F5F6F7] cursor-text font-bold w-4 h-4 rounded-full flex items-center justify-center'>
            <p className='text-xs'>i</p>
          </div>
        </Tooltip>
      </div>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className='flex flex-col gap-y-6'
      >
        <Controller
          name='current_password'
          control={control}
          rules={{
            required: 'Password is required',
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label='Old password'
              withAsterisk
              error={
                errors.current_password?.message ||
                (resetPasswordMutation?.error?.response?.data?.message ===
                  'Incorrect old password' &&
                  'Incorrect old password')
              }
              placeholder='Enter your old password'
              classNames={{
                label: '!text-base !font-bold',
                input: '!h-[2.875rem] !bg-[#F9F9F9]',
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
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: (value) =>
                    value !== watch('current_password') ||
                    'New password must differ from the old password',
                }}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    placeholder='Create your new password'
                    label='New password'
                    withAsterisk
                    error={
                      errors?.new_password?.message ||
                      (resetPasswordMutation?.error?.response?.data?.message ===
                        'New password must be different from old password' &&
                        'Change your password to something new')
                    }
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <EyeOpen /> : <EyeClose />
                    }
                    classNames={{
                      label: '!text-base !font-bold',
                      input: '!h-[2.875rem] !bg-[#F9F9F9]',
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
              placeholder='Re-enter your new password'
              withAsterisk
              classNames={{
                label: '!text-base !font-bold',
                input: '!h-[2.875rem] !bg-[#F9F9F9]',
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
        <div className='flex justify-center items-center'>
          <PrimaryButton
            loading={resetPasswordMutation?.isPending}
            rootClassName='!h-14 !rounded-full'
            titleClassName='!text-lg'
            type='submit'
            variant='gradient'
          >
            Update Password
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
