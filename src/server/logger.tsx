import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 20 * 1024 * 1024, // 20 MB
      maxFiles: 10,
    }),
    new transports.File({
      filename: path.join('logs', 'combined.log'),
      maxsize: 20 * 1024 * 1024,
      maxFiles: 10,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join('logs', 'exceptions.log') }),
  ],
});

export default logger;
