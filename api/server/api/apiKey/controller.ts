import lib from '@/lib/apiKey';
import { handleError, respondWithResult } from '@/util/responses';

export const create = async (req, res) => {
  const userId = req.headers['x-greenhouse-userid'] as string;

  try {
    await lib.create({ userId, apiKey: req.body.apiKey });

    return respondWithResult(res, 201)('API key created');
  } catch (error) {
    return handleError(res)(error);
  }
};
