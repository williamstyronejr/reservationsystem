import { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { requireLocalSignin } from '../middlewares/auth';
import {
  validateAccountUpdate,
  validatePasswordUpdate,
} from '../middlewares/validation';
import { compareHash } from '../utils/utils';
import {
  findUserById,
  updateUserById,
  updateUserPassword,
} from '../services/user';
import { uploadFile } from '../middlewares/user';
import { removeFirebaseFile, defaultUrls } from '../services/firebase';

const jsonParser = bodyParser.json({});
const router = Router();

const profileImageParser = multer({
  storage: multer.memoryStorage(),
}).single('profile');

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
  requireLocalSignin,
  validateAccountUpdate,
  uploadFile,
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

router.post(
  '/settings/account/profile',
  requireLocalSignin,
  profileImageParser,
  uploadFile,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;
    const { remove } = req.body;
    const { fileLoc } = res.locals;

    if (!fileLoc) return res.json({ success: false });

    try {
      const oldUser = await findUserById(id);
      if (!oldUser) return res.json({ success: false });

      if (remove) {
        if (oldUser.profileImage === defaultUrls.profileImage)
          return res.json({ success: false });

        const results = await updateUserById(id, {
          profileImage: defaultUrls.profileImage,
        });

        if (results[0] === 1)
          await removeFirebaseFile((oldUser as any).profileImage);

        return res.json({
          success: true,
          profileImage: defaultUrls.profileImage,
        });
      }

      const { url } = fileLoc[0];
      const user = await updateUserById(
        id,
        { profileImage: url },
        { returning: false },
      );

      if (!user) return res.json({ success: false });

      res.json({ success: true, profileImage: url });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/settings/account/delete',
  requireLocalSignin,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as any;

    try {
      return res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
