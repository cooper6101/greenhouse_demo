import lib from '@/lib/jobs';
import { decrypt } from '@/util/encrypt';
import { handleError, respondWithResult } from '@/util/responses';

export const one = async (req, res) => {
  const key = req.headers['x-greenhouse-key'] as string;

  try {
    const decryptedKey = decrypt(key);
    const { id } = req.params;
    const job = await lib.one({ id, key: decryptedKey });

    return respondWithResult(res)(job);
  } catch (error) {
    return handleError(res)(error);
  }
};

export const search = async (req, res) => {
  const key = req.headers['x-greenhouse-key'] as string;

  try {
    const decryptedKey = decrypt(key);
    const { perPage, page } = req.query;

    const jobs = await lib.search({
      perPage,
      page,
      key: decryptedKey,
    });

    return respondWithResult(res)(jobs);
  } catch (error) {
    return handleError(res)(error);
  }
};
