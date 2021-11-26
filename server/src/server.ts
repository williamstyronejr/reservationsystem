import http from 'http';
import app from './services/app';
import { setupRedis, closeRedis } from './services/redis';
import logger from './services/logger';
import db from './models/index';

interface ServerAsync extends http.Server {
  closeAsync?: Function;
}

const { REDIS_HOST, REDIS_PORT, REDIS_URL } = process.env;

/**
 * Set the exit handler for server shut down.
 * @param server Http server instance
 */
function gracefulShutdown(server: ServerAsync): void {
  async function exitHandler(options: { exit?: boolean } = {}) {
    if (server.closeAsync)
      await server
        .closeAsync()
        .then(() => {
          logger.info('Server gracefully shut down');
        })
        .finally(() => {
          closeRedis();
        })
        .catch((err: Error) => {
          logger.warn(`Error on shutdown, ${err.stack}`);
        });

    if (options.exit) process.exit();
  }

  process.on('exit', exitHandler);

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}

/**
 * Sets up  all services (database, redis) and then starts up the server.
 * @param IP Ip/Hostname for server
 * @param PORT Port for server
 * @returns Returns the server instance
 */
export default async function startServer(
  IP: string,
  PORT: number,
): Promise<http.Server> {
  const httpServer: ServerAsync = http.createServer(app);

  await db.sequelize.sync({ force: false });
  await setupRedis(REDIS_HOST, parseInt(REDIS_PORT as string, 10), REDIS_URL);

  await new Promise<void>((res) => {
    httpServer.listen({ port: PORT, ip: IP }, res);
  });

  const originalClose = httpServer.close.bind(httpServer);

  httpServer.closeAsync = () =>
    new Promise((resolveClose) => {
      originalClose(resolveClose);
    });

  gracefulShutdown(httpServer);

  logger.info(`Server started at ${IP}:${PORT}`);
  return httpServer;
}
