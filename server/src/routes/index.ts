import { Application, Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export default function setupRoutes(app: Application) {
  // Error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logger.error(err);
    }

    res.status(500).send('Server error occurred, please try again.');
  });
}
