import redis, { RedisClient } from 'redis';
import logger from './logger';

let redisClient: RedisClient | null;

/**
 * Sets up connection to redis. Prioritizes URL to form connection.
 * @param HOST Hostname for Redis (default: localhost)
 * @param PORT Port for Redis  (default: 6379)
 * @param URL URL URL connection string for redis
 * @returns Returns the redis client.
 */
export function setupRedis(
  HOST = 'localhost',
  PORT = 6379,
  URL: string | null = null,
): Promise<RedisClient> {
  redisClient = URL ? redis.createClient(URL) : redis.createClient(PORT, HOST);

  return new Promise((res, rej) => {
    redisClient?.on('error', (err) => {
      rej(err);
    });

    redisClient?.on('ready', () => {
      logger.info(`Redis connection on ${HOST}:${PORT}`);
      res(redisClient as RedisClient);
    });
  });
}

/**
 * Closes connection to redis.
 */
export function closeRedis(): void {
  if (redisClient) redisClient.quit();
}
