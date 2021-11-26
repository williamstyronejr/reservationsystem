import { createLogger, format, transports } from 'winston';

const { NODE_ENV } = process.env;
const logger = createLogger();

if (NODE_ENV === 'development') {
  logger.level = 'debug';
  logger.format = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(
      ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level}: ${stack || message} `,
    ),
  );
  logger.add(new transports.Console());
} else {
  logger.level = 'info';
  logger.format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json(),
  );
  logger.add(new transports.Console());
}

export default logger;
