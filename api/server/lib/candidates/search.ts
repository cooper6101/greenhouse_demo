import ErrorException from '@/util/ErrorException';
import gh from '@/util/greenhouse';
import type { Candidate } from './types';

const search = async ({
  perPage,
  page,
  jobId,
  key,
}: {
  perPage: number;
  page: number;
  jobId: string;
  key: string;
}) => {
  if (!key) {
    throw new ErrorException({
      message: 'API key is required',
      statusCode: 401,
    });
  }

  const { data } = await gh(key).get<Candidate[]>(`/candidates`, {
    params: { per_page: perPage, page, job_id: jobId },
  });

  return data;
};

export default search;
