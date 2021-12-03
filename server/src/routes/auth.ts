import { Router, Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { createUser } from '../services/user';
import { requireLocalSignin } from '../middlewares/auth';
import { validateSignup } from '../middlewares/validation';
import { hashString } from '../utils/utils';

const jsonParser = bodyParser.json({});
const router = Router();

router.post(
  '/signin',
  jsonParser,
  requireLocalSignin,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({});
  },
);

router.post(
  '/signup',
  jsonParser,
  validateSignup,
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {
      const hash = await hashString(password);
      const user = await createUser(username, email, hash);

      res.json({ success: true });
    } catch (err: any) {
      // Existing unique fields
      if (err.name && err.name === 'SequelizeUniqueConstraintError') {
        err.status = 400;
        err.msg = {};

        Object.keys(err.fields).forEach((field) => {
          if (field === 'username') {
            err.msg.username = 'Username is already in use';
          } else if (field === 'email') {
            err.msg.email = 'Email is already in use';
          }
        });
      }

      return next(err);
    }
  },
);

export default router;
