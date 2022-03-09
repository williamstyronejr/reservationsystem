import bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import { requireLocalSignin } from '../middlewares/auth';
import { validateReview, validateStore } from '../middlewares/validation';
import { createStore, getStoreWithComments } from '../services/store';
import { createReview } from '../services/review';

const jsonParser = bodyParser.json({});
const router = Router();

router.get(
  '/store/:storeId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;

    try {
      const store = await getStoreWithComments(storeId);

      if (!store) return res.json({});

      return res.json({ ...store.dataValues });
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/dahboard/store/:storeId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;
    const { id } = req.user as any;

    try {
      const store = await getStoreWithComments(storeId);

      if (!store) return res.json({});

      return res.json({ ...store.datavalues });
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

router.post(
  '/store/:storeId/review/create',
  jsonParser,
  requireLocalSignin,
  validateReview,
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, rating } = req.body;
    const { id } = req.user as any;
    const { storeId } = req.params;

    try {
      const review = await createReview(rating, message, id, storeId);

      return res.json({ review: review.dataValues });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
