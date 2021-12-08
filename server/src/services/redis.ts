import { createClient } from 'redis';
import logger from './logger';

type RedisClientType = ReturnType<typeof createClient>;

let redisClient: RedisClientType | null;

/**
 * Sets up connection to redis. Prioritizes URL to form connection.
 * @param HOST Hostname for Redis (default: localhost)
 * @param PORT Port for Redis  (default: 6379)
 * @param URL URL URL connection string for redis
 * @returns Returns the redis client.
 */
export async function setupRedis(
  HOST = 'localhost',
  PORT = 6379,
  URL: string | null = null,
): Promise<RedisClientType> {
  redisClient = URL
    ? createClient({ url: URL })
    : createClient({ socket: { host: HOST, port: PORT } });

  await redisClient.connect();
  await redisClient.ping();
  logger.info(`Connected to redis ${URL || `${HOST}:${PORT}`}`);

  return redisClient as RedisClientType;
}

/**
 * Closes all connections to redis forcefully.
 * @return Returns a promise to resolve when the client is closed.
 */
export async function closeRedis(): Promise<void> {
  if (redisClient) await redisClient.quit();
}
