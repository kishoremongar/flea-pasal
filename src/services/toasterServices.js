import { notifications } from '@mantine/notifications';
import CancelRed from '../../public/assets/icons/cancel_red.svg';
import SuccessCheck from '../../public/assets/icons/check_primary.svg';

const SuccessToast = ({ text = '' }) => {
  notifications.show({
    title: 'Success',
    message: text,
    icon: <SuccessCheck />,
    color: '#ffffff',
    classNames: {
      icon: '!bg-white',
      root: '!bg-black',
    },
    className: 'success-toast',
  });
};
const ErrorToast = ({ text = 'Something went wrong' }) => {
  notifications.show({
    title: 'Error',
    message: text,
    color: '#ffffff',
    icon: <CancelRed />,
    classNames: {
      icon: '!bg-white border-2 border-primary',
    },
    className: 'error-toast',
  });
};

export { SuccessToast, ErrorToast };
