import { Application, Request, Response, NextFunction } from 'express';
import AuthRouter from './auth';
import logger from '../services/logger';

export default function setupRoutes(app: Application) {
  app.use(AuthRouter);

  // Catch all error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logger.error(err);

      if (err.status && err.status === 400) {
        switch (err.status) {
          case 400: // Invalid user input
            res.status(err.status).json({ errors: err.msg });
            break;
          default:
            res
              .status(500)
              .send('An error occurred on the server, please try again.');
        }
        return;
      }
    }

    return res.status(500).send('Server error occurred, please try again.');
  });
}
