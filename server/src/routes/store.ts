import bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import { requireLocalSignin } from '../middlewares/auth';
import { validateStore } from '../middlewares/validation';
import { createStore } from '../services/store';

const jsonParser = bodyParser.json({});
const router = Router();

router.get(
  '/store/:storeId',
  async (req: Request, res: Response, next: NextFunction) => {},
);

router.get(
  '/dahboard/store/:storeId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;
    const { id } = req.user as any;

    try {
      //
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/store/create',
  jsonParser,
  validateStore,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, isPublic, headerImage, icon, phone, tags } =
      req.body;
    const { id } = req.user as any;

    try {
      const store = await createStore(
        id,
        name,
        location,
        tags,
        phone,
        isPublic,
      );

      return res.json({ storeId: store.id });
    } catch (err: any) {
      console.log(Object.keys(err));
      console.log(err.name);
      next(err);
    }
  },
);

export default router;
