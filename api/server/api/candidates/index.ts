import type { FastifyInstance } from 'fastify';
import authenticate from '@/middleware/authenticate';
import * as controller from './controller';

const routes = (router: FastifyInstance, prefix: string) => {
  router.get(`${prefix}`, {
    preHandler: authenticate(),
    handler: controller.search,
  });
};

export default routes;
