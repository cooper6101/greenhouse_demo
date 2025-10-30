import type { FastifyInstance } from 'fastify';
import authenticate from '@/middleware/authenticate';
import * as controller from './controller';

const routes = (router: FastifyInstance, prefix: string) => {
  router.post(`${prefix}`, {
    preHandler: authenticate(),
    handler: controller.create,
  });

  router.delete(`${prefix}`, {
    preHandler: authenticate(),
    handler: controller.destroy,
  });
};

export default routes;
