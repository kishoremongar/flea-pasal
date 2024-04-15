import { notifications } from '@mantine/notifications';
import CancelRed from '../../public/assets/icons/cancel_red.svg';
import SuccessCheck from '../../public/assets/icons/check_primary.svg';

const SuccessToast = ({ text = '' }) => {
  notifications.show({
    title: 'Success',
    message: text,
    icon: <SuccessCheck />,
    classNames: {
      icon: '!bg-white',
      root: 'bg-secondary',
      title: '!text-primary',
    },
  });
};
const ErrorToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    title: 'Error',
    message: text,
    icon: <CancelRed />,
    classNames: {
      icon: '!bg-white border-2 border-primary',
      title: '!text-[#ef4444]',
    },
  });
};

export { SuccessToast, ErrorToast };
