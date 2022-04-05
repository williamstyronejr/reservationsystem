import bodyParser from 'body-parser';
import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { requireLocalSignin } from '../middlewares/auth';
import {
  validateReview,
  validateStore,
  validateStoreUpdate,
} from '../middlewares/validation';
import {
  createStore,
  getStoreWithComments,
  deleteStore,
  updateStore,
  getStoreById,
} from '../services/store';
import { createReview, deleteReview, findReviewById } from '../services/review';
import { uploadFile } from '../middlewares/user';
import { defaultUrls, removeFirebaseFile } from '../services/firebase';

const jsonParser = bodyParser.json({});
const storeImageParser = multer({ storage: multer.memoryStorage() }).fields([
  { name: 'headerImage', maxCount: 1 },
  { name: 'icon', maxCount: 1 },
]);
const router = Router();

router.get(
  '/store/:storeId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;

    try {
      const store = await getStoreWithComments(storeId);

      if (!store) {
        const missingError: any = new Error(`${storeId} does not exist.`);
        missingError.status = 404;
        return next(missingError);
      }

      return res.json({ ...store.dataValues });
    } catch (err: any) {
      // Invalid or non existing store id
      if (
        err.original &&
        (err.original.code === '22P02' || err.original.code === '23503')
      ) {
        err.status = 404;
        return next(err);
      }
      next(err);
    }
  },
);

router.get(
  '/dashboard/store/:storeId',
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { storeId } = req.params;
    const { id } = req.user as any;

    try {
      const store = await getStoreWithComments(storeId);
      if (!store) {
        const missingError: any = new Error(
          `Store, ${storeId} for dashboard could not be found.`,
        );
        missingError.status = 404;
        return next(missingError);
      }

      if (store.manager !== id) {
        const permissionError: any = new Error(
          `User, ${id}, does not have permission for store, ${storeId}.`,
        );
        permissionError.status = 403;
        return next(permissionError);
      }

      return res.json({ ...store.dataValues });
    } catch (err: any) {
      // Invalid or non existing store id
      if (
        err.original &&
        (err.original.code === '22P02' || err.original.code === '23503')
      ) {
        err.status = 404;
        return next(err);
      }
      next(err);
    }
  },
);

router.post(
  '/store/create',
  jsonParser,
  requireLocalSignin,
  validateStore,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, location, isPublic, phone, tags } = req.body;
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
      next(err);
    }
  },
);

router.post(
  '/store/:storeId/delete',
  jsonParser,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { storeId } = req.params;

    try {
      const rowsDeleted = await deleteStore(storeId, id);

      return res.json({ success: rowsDeleted === 1 });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/store/:storeId/update',
  jsonParser,
  requireLocalSignin,
  validateStoreUpdate,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { storeId } = req.params;
    const { name, location, isPublic, phone, tags } = req.body;

    try {
      const store = await getStoreById(storeId);
      if (!store) {
        const nonExistError = new Error(`${storeId} does not exist to update`);
        (nonExistError as any).status = 404;
        return next(nonExistError);
      }

      if (store.dataValues.manager !== id) {
        const permissionError = new Error(
          `User, ${id}, does not have permission to update`,
        );
        (permissionError as any).status = 403;
        return next(permissionError);
      }

      const [rowsChanged, results] = await updateStore(storeId, id, {
        name,
        location,
        public: isPublic,
        phone,
        tags,
      });

      if (rowsChanged === 0) {
        const unknownError: any = new Error(
          `Store, ${id}, could not be updated.`,
        );
        unknownError.status = 400;
        unknownError.msg = {
          general: 'An error occurred on during update, please try again.',
        };
        return next(unknownError);
      }

      return res.json({ ...results[0].dataValues });
    } catch (err: any) {
      // Invalid or non existing store ids
      if (
        err.original &&
        (err.original.code === '22P02' || err.original.code === '23503')
      ) {
        err.status = 404;
        return next(err);
      }

      return next(err);
    }
  },
);

router.post(
  '/store/:storeId/update/image',
  requireLocalSignin,
  jsonParser,
  storeImageParser,
  uploadFile,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { removeHeader, removeIcon } = req.body;
    const { storeId } = req.params;
    const { fileLoc } = res.locals;

    if (!fileLoc && !removeHeader && !removeIcon)
      return res.json({ success: false });

    try {
      const params: { headerImage?: string; icon?: string } = {};
      const oldStore = await getStoreById(storeId);

      if (!oldStore) {
        const missingError: any = new Error(
          `Store, ${storeId}, does not exist.`,
        );
        missingError.status = 404;
        return next(missingError);
      }

      if (oldStore.manager !== id) {
        const permissionError: any = new Error(
          `User, ${id}, does not have permissions for store, ${storeId}`,
        );
        permissionError.status = 403;
        return next(permissionError);
      }

      if (
        (removeHeader && oldStore.headerImage === defaultUrls.storeHeader) ||
        (removeIcon && oldStore.icon === defaultUrls.storeIcon)
      ) {
        return res.json({ succees: false });
      }

      const removalProms: Array<Promise<any>> = [];

      if (fileLoc) {
        fileLoc.forEach((loc: any) => {
          if (loc.fieldName === 'headerImage') {
            params.headerImage = loc.url;

            if (oldStore.headerImage !== defaultUrls.storeHeader)
              removalProms.push(removeFirebaseFile(oldStore.headerImage));
          }

          if (loc.fieldName === 'icon') {
            params.icon = loc.url;
            if (oldStore.icon !== defaultUrls.storeIcon)
              removalProms.push(removeFirebaseFile(oldStore.icon));
          }
        });
      } else {
        if (removeHeader) {
          params.headerImage = defaultUrls.storeHeader;
          removalProms.push(removeFirebaseFile(oldStore.headerImage));
        }

        if (removeIcon) {
          params.icon = defaultUrls.storeIcon;
          removalProms.push(removeFirebaseFile(oldStore.icon));
        }
      }

      await Promise.all(removalProms);

      const results = await updateStore(storeId, id, params);
      if (results[0] !== 1) return res.json({ success: false });

      return res.json({ success: true, fields: params });
    } catch (err) {
      return next(err);
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
      const store = await getStoreById(storeId);

      if (!store) {
        const missingError: any = new Error(
          `Store, ${storeId}, is not availble to be reviewed.`,
        );
        missingError.status = 404;

        return next(missingError);
      }
      if (!store.public) {
        const permissionError: any = new Error(
          `Store, ${storeId}, is not public for reviews.`,
        );
        permissionError.status = 404;
        return next(permissionError);
      }

      const review = await createReview(rating, message, id, storeId);

      return res.json({ review: review.dataValues });
    } catch (err: any) {
      // Invalid or non existing store ids
      if (
        err.original &&
        (err.original.code === '22P02' || err.original.code === '23503')
      ) {
        err.status = 404;
        return next(err);
      }

      next(err);
    }
  },
);

router.post(
  '/review/:reviewId/delete',
  jsonParser,
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { reviewId } = req.params;

    try {
      // Check if review exist and user has permissions
      const review = await findReviewById(reviewId);
      if (!review) {
        const missingError = new Error(
          `Review id, ${reviewId}, does not exist for deletion`,
        );
        (missingError as any).status = 404;

        return next(missingError);
      }

      if (review.dataValues.authorId !== id) {
        const permissionError = new Error(
          `User, ${id}, trying to delete review without permissions.`,
        );
        (permissionError as any).status = 403;
        return next(permissionError);
      }

      const rowsDeleted = await deleteReview(reviewId, id);

      return res.json({ success: rowsDeleted === 1 });
    } catch (err: any) {
      // Invalid or non existing review ids
      if (
        err.original &&
        (err.original.code === '22P02' || err.original.code === '23503')
      ) {
        err.status = 404;
        return next(err);
      }

      return next(err);
    }
  },
);

export default router;
