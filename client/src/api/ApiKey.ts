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

export const destroy = async ({
  details: _details,
  headers,
}: {
  details?: Record<string, never>;
  headers: AxiosHeaders;
}): Promise<void> => api.delete('api-key', { headers });
