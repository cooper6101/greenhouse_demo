import Cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';
import fastifyQs from 'fastify-qs';
import routes from './routes';

function build(
  opts = {
    logger: false,
  }
) {
  const app = Fastify(opts);

  app.register(fastifyQs, {});

  app.register(Cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  routes(app);

  return app;
}

export default build;
