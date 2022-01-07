import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export const authenticateLocalSignin = passport.authenticate('local', {});

export const requireLocalSignin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.isAuthenticated() || !req.user) {
    const err: any = new Error('User not authenticated.');
    err.status = 401;
    return next(err);
  }

  next();
};
