import axios from 'axios';

// import Cookies from 'js-cookie';

const instance = axios.create();

// intercept jwt errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // in case we want to retry request in the future
    // let originalRequest = error.config
    // console.log(error.response);
    if (error.response?.status === 401) {
      // window.location.reload();
      throw error.response;
    }
    if (error.error && error.error === 'consent_required') {
      // window.location.reload();
      throw error.error;
    }
    if (error.response?.data) {
      throw error.response.data;
    }
    // Do something with response error
    throw error.response;
  }
);

export default instance;
