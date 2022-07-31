import { Router, Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { createUser } from '../services/user';
import { authenticateLocalSignin } from '../middlewares/auth';
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
  authenticateLocalSignin,
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
      const newUser = await createUser(username, email, hash);

      passport.authenticate('local', {}, (err, user) => {
        if (err) return next(err);
        if (!user) {
          // Test
        }

        req.logIn(user, (logErr) => {
          if (logErr) {
            return next(logErr);
          }

          res.json({
            success: true,
            user: {
              id: newUser.id,
              username: newUser.username,
            },
          });
        });
      })(req, res, next);
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

router.post(
  '/signout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, rej) => {
        req.logOut((err) => {
          if (err) rej(err);
          resolve();
        });
      });

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
