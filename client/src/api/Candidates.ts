import type { AxiosHeaders } from 'axios';
import type { Candidate } from '@/util/types';
import api from './api';

export const search = async ({
  headers,
  details,
}: {
  headers: AxiosHeaders;
  details: Record<string, unknown>;
}): Promise<Candidate[]> => api.get('candidates', { headers, query: details });
