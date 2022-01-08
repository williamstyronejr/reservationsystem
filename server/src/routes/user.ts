import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { requireLocalSignin } from '../middlewares/auth';
import {
  validateAccountUpdate,
  validatePasswordUpdate,
} from '../middlewares/validation';
import { compareHash } from '../utils/utils';
import { updateUserById, updateUserPassword } from '../services/user';

const jsonParser = bodyParser.json({});
const router = Router();

router.get(
  '/session',
  requireLocalSignin,
  (req: Request, res: Response, next: NextFunction) => {
    const { user }: { user?: any } = req;
    if (!user) return next(new Error());

    res.json({
      id: user.id,
      username: user.username,
    });
  },
);

router.post(
  '/settings/password',
  jsonParser,
  validatePasswordUpdate,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, password } = req.body;
    const { hash, id } = req.user as any;

    try {
      const result = await compareHash(oldPassword, hash);
      if (!result) {
        const passError: any = new Error();
        passError.status = 404;
        passError.msg = {
          password: 'Incorrect password.',
        };

        return next(passError);
      }

      await updateUserPassword(id, password);

      res.json({ success: true });
    } catch (err: any) {
      next(err);
    }
  },
);

router.post(
  '/settings/account',
  jsonParser,
  validateAccountUpdate,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, username } = req.body;
    const { id } = req.user as any;

    try {
      const param: any = {};
      if (email) param.email = email;
      if (username) param.username = username;

      await updateUserById(id, param);

      res.json({ success: true });
    } catch (err: any) {
      if (err.name && err.name === 'SequelizeUniqueConstraintError') {
        const errors: any = {};

        if (err.fields) {
          Object.keys(err.fields).forEach((field) => {
            if (field === 'username')
              errors.username = 'Username is already taken';
            if (field === 'email') errors.email = 'Email is already taken';
          });
        }

        if (Object.keys(errors).length > 0) {
          err.msg = errors;
          err.status = 400;
          return next(err);
        }
      }
      next(err);
    }
  },
);
export default router;
