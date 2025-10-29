import lib from '@/lib/candidates';
import { decrypt } from '@/util/encrypt';
import { handleError, respondWithResult } from '@/util/responses';

export const search = async (req, res) => {
  const key = req.headers['x-greenhouse-key'] as string;

  try {
    const decryptedKey = decrypt(key);
    const { perPage, page, jobId } = req.query;

    const candidates = await lib.search({
      perPage,
      page,
      jobId,
      key: decryptedKey,
    });

    return respondWithResult(res)(candidates);
  } catch (error) {
    return handleError(res)(error);
  }
};
