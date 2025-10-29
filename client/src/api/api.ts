import { env } from '@/util/env';
import axios from './axios';

const { VITE_BASE_URL: baseURL } = env;

export default {
  get: (
    url: string,
    {
      query,
      headers,
    }: {
      query?: any;
      headers?: any;
    }
  ) => {
    return axios({
      url: `${baseURL}/api/${url}`,
      params: query,
      method: 'GET',
      headers,
    }).then((response) => response.data);
  },

  post: (
    url: string,
    {
      data,
      query,
      headers,
    }: {
      data?: any;
      query?: any;
      headers?: any;
    }
  ) => {
    return axios({
      url: `${baseURL}/api/${url}`,
      method: 'POST',
      data,
      params: query,
      headers,
    }).then((response) => response.data);
  },

  put: (
    url: string,
    {
      data,
      query,
      headers,
    }: {
      data?: any;
      query?: any;
      headers?: any;
    }
  ) => {
    return axios({
      url: `${baseURL}/api/${url}`,
      method: 'PUT',
      data,
      params: query,
      headers,
    }).then((response) => response.data);
  },

  delete: (
    url: string,
    {
      query,
      headers,
    }: {
      query?: any;
      headers?: any;
    }
  ) => {
    return axios({
      url: `${baseURL}/api/${url}`,
      method: 'DELETE',
      params: query,
      headers,
    }).then((response) => response.data);
  },
};
