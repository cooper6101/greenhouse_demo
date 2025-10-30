import type { AxiosHeaders } from 'axios';
import api from './api';

export const create = async ({
  details,
  headers,
}: {
  details: {
    apiKey: string;
  };
  headers: AxiosHeaders;
}): Promise<void> => api.post('api-key', { data: details, headers });
