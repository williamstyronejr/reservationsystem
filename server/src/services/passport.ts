import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../models/index';
import { compareHash } from '../utils/utils';

const localStrategy = new LocalStrategy(
  (username: string, password: string, done) => {
    db.models.User.findOne({ where: { username } })
      .then((user: any) => {
        if (!user) return done(null, false);

        compareHash(password, user.hash).then((valid) => {
          if (valid) return done(null, user);
          return done(null, false);
        });
      })
      .catch((err: any) => {
        done(err, false);
      });
  },
);

passport.use(localStrategy);
