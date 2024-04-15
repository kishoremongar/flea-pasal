import axios from 'axios';
import store from '../store/store';

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

  return config;
});
instance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const errTxt = JSON.parse(error?.request?.response);
    if (
      errTxt.message === 'Token has expired' ||
      errTxt.message === 'User not found' ||
      errTxt.message === 'Unauthorized User' ||
      errTxt.message === 'Token is invalid'
    ) {
      setTimeout(() => {
        window.location.replace('/auth/login');

        localStorage.clear();
      }, 1000);
    }
    return Promise.reject(error);
  }
);
export default instance;
