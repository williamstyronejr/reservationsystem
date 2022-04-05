import bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import { requireLocalSignin } from '../middlewares/auth';
import { findStoresByUserId } from '../services/store';

const router = Router();
const jsonParser = bodyParser.json({});

router.get(
  '/dashboard/stores',
  requireLocalSignin,
  jsonParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { cursor } = req.query;

    try {
      const offset = cursor ? parseInt(cursor as string, 10) : 0;
      const stores = await findStoresByUserId(id, 10, offset);

      return res.json({ stores, cursor: offset + stores.length });
    } catch (err: any) {
      next(err);
    }
  },
);

export default router;
