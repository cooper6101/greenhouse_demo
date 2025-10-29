import 'dotenv/config';

import app from './app';
import config from './config';

const server = app({
  logger: {
    level: 'info',
    transport:
      config.NODE_ENV === 'test'
        ? {
            target: 'pino-pretty',
          }
        : null,
  },
} as any);

/**
 * Run the server!
 */
const start = async () => {
  try {
    server.listen({ port: config.port, host: config.ip });
    console.log('🚀 Server ready at http://%s:%s', config.ip, config.port);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
  return undefined;
};
start();
