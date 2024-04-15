import { ErrorToast } from '@/services/toasterServices';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

export const errorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload.data;
    const status = action.payload.status;
    /* eslint no-console: "error" */
    console.log('status', status);
    console.log('action', action);
    const isMutation = action.meta.arg.type === 'mutation';

    if (isMutation) {
      let message;
      if (typeof error === 'string' && !error.includes('DOCTYPE')) {
        message = error;
      } else if (typeof error === 'object') {
        message = JSON.stringify(error);
        if ('detail' in error) {
          message = error.detail;
        }
        if ('msg' in error) {
          message = error.msg;
        }
        if ('message' in error) {
          message = error.message;
        }
      } else {
        message = 'something went wrong';
      }
      ErrorToast({ text: message });
    } else {
      /* eslint no-console: "error" */
      console.log(
        'endpoint name: ',
        action.meta.arg.endpointName,
        'query status: ',
        status,
        'query error: ',
        error
      );
    }

    if (status === 401) {
      signOut({ redirect: '/auth/login' });
    }

    if (status === 403 || action.payload.originalStatus === 403) {
      toast.info(action?.payload?.data);
    }
    /* eslint no-console: "error" */
    console.log('ACCCC: ', action);
  }

  return next(action);
};
