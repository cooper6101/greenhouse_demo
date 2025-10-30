import ErrorException from '@/util/ErrorException';
import gh from '@/util/greenhouse';
import type { Job } from './types';

const search = async ({
  perPage = 25,
  page = 1,
  key,
}: {
  perPage: number;
  page: number;
  key: string;
}) => {
  if (!key) {
    throw new ErrorException({
      message: 'API key is required',
      statusCode: 401,
    });
  }

  const { data } = await gh(key).get<Job[]>(`/jobs`, {
    params: {
      per_page: perPage,
      page,
    },
  });

  return data;
};

export default search;
