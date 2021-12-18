import path from 'path';
import { Application, Request, Response, NextFunction } from 'express';
import AuthRouter from './auth';
import UserRouter from './user';
import logger from '../services/logger';

const { NODE_ENV } = process.env;

export default function setupRoutes(app: Application) {
  app.use(AuthRouter);
  app.use(UserRouter);

  app.get('/getCSRFToken', (req: Request, res: Response) => {
    res.json({ CSRFToken: req.csrfToken() });
  });

  app.get('/*', (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(
        path.join(
          NODE_ENV === 'development'
            ? path.join(
                __dirname,
                '..',
                '..',
                '..',
                'client',
                'build',
                'index.html',
              )
            : path.join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'client',
                'build',
                'index.html',
              ),
        ),
      );
    } catch (err) {
      next(err);
    }
  });

  // Catch all error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logger.error(err);

      if (err.status) {
        switch (err.status) {
          case 400: // Invalid user input
            res.status(err.status).json({ errors: err.msg });
            break;
          case 401: // Unauthenticated
            res.status(err.status).send('');
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
