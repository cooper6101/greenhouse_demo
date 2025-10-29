import gh from '@/util/greenhouse';
import type { Job } from './types';

const one = async ({ id, key }: { id: string; key: string }) => {
  const { data } = await gh(key).get<Job>(`/jobs/${id}`);

  return data;
};

export default one;
