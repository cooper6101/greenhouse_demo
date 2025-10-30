import type { FastifyReply, FastifyRequest } from 'fastify';
import ErrorException from '@/util/ErrorException';
import propel from '@/util/propel';

const authenticate =
  () => async (request: FastifyRequest, _reply: FastifyReply) => {
    if (!request.headers.authorization)
      throw new ErrorException({
        message: 'Unauthorized: Missing Token',
        statusCode: 401,
      });

    const user = await propel.validateAccessTokenAndGetUser(
      request.headers.authorization
    );

    // set headers
    request.headers['x-greenhouse-userid'] = user.userId;
    request.headers['x-greenhouse-key'] = (
      user.properties?.metadata as any
    )?.greenhouseApiKey;
  };

export default authenticate;
