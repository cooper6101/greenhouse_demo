import type { AxiosHeaders } from 'axios';
import type { Job } from '@/util/types';
import api from './api';

export const search = async ({
  headers,
  details,
}: {
  headers: AxiosHeaders;
  details: Record<string, unknown>;
}): Promise<Job[]> => api.get('jobs', { headers, query: details });

export const one = async ({
  headers,
  details,
}: {
  headers: AxiosHeaders;
  details: { id: string };
}): Promise<Job> => api.get(`jobs/${details.id}`, { headers });
