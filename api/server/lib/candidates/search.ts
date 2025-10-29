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
  const { data } = await gh(key).get<Candidate[]>(`/candidates`, {
    params: { per_page: perPage, page, job_id: jobId },
  });

  return data;
};

export default search;
