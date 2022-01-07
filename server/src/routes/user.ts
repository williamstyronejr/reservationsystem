import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { requireLocalSignin } from '../middlewares/auth';
import { validatePasswordUpdate } from '../middlewares/validation';
import { compareHash } from '../utils/utils';
import { updateUserPassword } from '../services/user';

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
    } catch (err) {
      next(err);
    }
  },
);
export default router;
