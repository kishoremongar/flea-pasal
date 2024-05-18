import axios from 'axios';
import { signOut } from 'next-auth/react';
import store from '../store/store';
import { ErrorToast } from './toasterServices';
import apiEndPoints from './apiEndPoints';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}`,
});

instance.interceptors.request.use((config) => {
  const reduxStore = store.getState();
  const token = reduxStore.auth.accessToken;
  const jwt = `Bearer ${token}`;

  if (token) {
    config.headers.Authorization = jwt;
  } else {
    config.headers.Authorization = null;
  }

  document.body.style.cursor = 'wait';
  return config;
});
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Reset cursor to default here
    document.body.style.cursor = 'default';
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Reset cursor to default here as well
    document.body.style.cursor = 'default';

    const reduxStore = store.getState();
    if ([405].includes(error?.request?.status)) {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.USER_LOGOUT}`;
        const config = {
          headers: {
            Authorization: `Bearer ${reduxStore?.auth?.accessToken}`,
          },
        };
        const res = await axios.post(apiUrl, {}, config);
        const data = res?.data;
        if (data?.status === 'SUCCESS') {
          localStorage.clear();
        }
      } catch (error) {
        ErrorToast({ text: 'Something went wrong.' });
      }
      localStorage.clear();
      signOut({
        redirect: true,
        callbackUrl: '/auth/login',
      });
    }

    return Promise.reject(error);
  }
);
export default instance;
