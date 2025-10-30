import ErrorException from '@/util/ErrorException';
import gh from '@/util/greenhouse';
import type { Job } from './types';

const one = async ({ id, key }: { id: string; key: string }) => {
  if (!key) {
    throw new ErrorException({
      message: 'API key is required',
      statusCode: 401,
    });
  }

  const { data } = await gh(key).get<Job>(`/jobs/${id}`);

  return data;
};

export default one;
