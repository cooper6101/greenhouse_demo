import type { FastifyInstance } from 'fastify';
import apiKey from './api/apiKey';
import candidates from './api/candidates';
import jobs from './api/jobs';

// import users from './api/users';

const routes = (app: FastifyInstance) => {
  // health check
  app.get(`/health`, async () => {
    return { status: 'ok', statusCode: 200 };
  });

  apiKey(app, '/api-key');
  candidates(app, '/candidates');
  jobs(app, '/jobs');
};

export default routes;
