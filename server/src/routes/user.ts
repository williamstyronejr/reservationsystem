import { Router, Request, Response, NextFunction } from 'express';
import { requireLocalSignin } from '../middlewares/auth';

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

export default router;
