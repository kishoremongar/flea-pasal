import { isRejectedWithValue } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

export const errorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload.data;
    const status = action.payload.status;
    console.log('status', status);
    console.log('action', action);
    const isMutation = action.meta.arg.type === 'mutation' ? true : false;

    if (isMutation) {
      // if (typeof error === "string" && !error.includes("DOCTYPE")) {
      //   message = error;
      // } else if (typeof error === "object") {
      //   message = JSON.stringify(error);
      //   if ("detail" in error) {
      //     message = error.detail;
      //   }
      //   if ("msg" in error) {
      //     message = error.msg;
      //   }
      //   if ("message" in error) {
      //     message = error.message;
      //   }
      // } else {
      //   message = "something went wrong";
      // }
      // toast.error(message);
    } else {
      // console.log(
      //   "endpoint name: ",
      //   action.meta.arg.endpointName,
      //   "query status: ",
      //   status,
      //   "query error: ",
      //   error
      // );
    }

    if (status === 401) {
      signOut({ redirect: '/auth/signin' });
    }

    if (status === 403 || action.payload.originalStatus === 403) {
      toast.info(action?.payload?.data);
    }

    // console.log("ACCCC: ", action);

    // if(status === 403) {

    // }
  }

  return next(action);
};
