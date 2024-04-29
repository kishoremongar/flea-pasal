import { Modal } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { closeSignoutModal } from '../../store/slices/auth';
import LogoutDoorIcon from '../../../public/assets/icons/logoutDoor.svg';
import CloseIcon from '../../../public/assets/icons/closeCross.svg';
import apiEndPoints from '../../services/apiEndPoints';
import PrimaryButton from './primaryButton';
import { ErrorToast } from '@/services/toasterServices';

export function LogoutModal() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.auth.signoutModal?.status);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleClose = () => {
    dispatch(closeSignoutModal());
  };

  const handleSignOut = async () => {
    setLogoutLoading(true);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.USER_LOGOUT}`;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.post(apiUrl, {}, config);
      const data = res?.data;
      if (data?.status === 'SUCCESS') {
        localStorage.clear();
        setLogoutLoading(false);
      }
    } catch (error) {
      setLogoutLoading(false);
      ErrorToast({ text: 'Something went wrong.' });
    }
    signOut({
      redirect: true,
      callbackUrl: '/auth/login',
    });
  };

  return (
    <Modal
      opened={isModalOpen}
      onClose={handleClose}
      size='sm'
      centered
      overlayProps={{ blur: 25, opacity: 0.3 }}
      withCloseButton={false}
      classNames={{
        title: 'w-full',
        body: 'flex flex-col justify-center items-center gap-y-8',
      }}
    >
      <button
        onClick={handleClose}
        className={`${
          logoutLoading ? 'cursor-not-allowed' : 'cursor-pointer'
        } self-end bg-[#F5F6F7] flex justify-center hover:bg-primary text-dark-gray1 w-8 h-8 hover:text-white items-center rounded-full`}
        disabled={logoutLoading}
      >
        <CloseIcon className='w-4 h-4' />
      </button>
      <div className='flex flex-col justify-center items-center gap-y-10 p-4'>
        <LogoutDoorIcon />
        <p className='text-center text-xl'>
          Are you sure, you want to log out?{' '}
        </p>
        <div className='flex gap-x-6'>
          <PrimaryButton
            variant='filled'
            rootClassName={{
              root: '!bg-light-secondary hover:!bg-light-secondary/75 text-light-primary font-normal',
            }}
            size='lg'
            onClick={handleSignOut}
            loading={logoutLoading}
          >
            Logout
          </PrimaryButton>
          <PrimaryButton
            variant='outline'
            onClick={handleClose}
            size='lg'
            disabled={logoutLoading}
            rootClassName={{
              root: 'text-light-primary font-normal !border-light-secondary',
            }}
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
