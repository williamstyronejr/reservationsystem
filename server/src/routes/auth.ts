import { Router, Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { createUser } from '../services/user';
import { requireLocalSignin } from '../middlewares/auth';
import { validateSignup, validateRecovery } from '../middlewares/validation';
import { hashString } from '../utils/utils';

const jsonParser = bodyParser.json({});
const router = Router();

router.post(
  '/recovery',
  jsonParser,
  validateRecovery,
  (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      // Send recovery email
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/signin',
  jsonParser,
  requireLocalSignin,
  (req: Request, res: Response) => {
    const { user }: any = req;

    if (!user) return res.json({ success: false });
    res.json({ user: { id: user.id, username: user.username } });
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

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      });
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
