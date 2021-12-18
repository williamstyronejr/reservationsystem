import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../models/index';
import { findUserById } from './user';
import { compareHash } from '../utils/utils';

passport.serializeUser((user: any, done) => done(null, { id: user.id }));
passport.deserializeUser((user: any, done) => {
  findUserById(user.id)
    .then((res: any) => {
      if (!res) return done(null, false);
      done(null, res.dataValues);
    })
    .catch(() => {
      done(null, false);
    });
});

const localStrategy = new LocalStrategy(
  { session: true },
  (username: string, password: string, done) => {
    db.models.User.findOne({ where: { username } })
      .then((user: any) => {
        if (!user) return done(null, false);

        compareHash(password, user.hash).then((valid) => {
          if (valid) return done(null, user.dataValues);
          return done(null, false);
        });
      })
      .catch((err: any) => {
        done(err, false);
      });
  },
);

passport.use(localStrategy);
