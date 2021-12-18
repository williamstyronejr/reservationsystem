import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import path from 'path';
import csurf from 'csurf';
import passport from 'passport';
import session from 'express-session';
import SessionStore from 'connect-session-sequelize';
import setupRoutes from '../routes/index';
import db from '../models/index';

const SequelizeStore = SessionStore(session.Store);
require('./passport');

const { NODE_ENV, SESSION_SECRET, CLIENT_DEV_URL } = process.env;
const app = express();

const cookieSettings: session.CookieOptions = {};
if (NODE_ENV !== 'development' && NODE_ENV !== 'test') {
  cookieSettings.secure = true;
  cookieSettings.httpOnly = true;
}

app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'development' ? CLIENT_DEV_URL : false,
  }),
);

app.use(
  '/static',
  express.static(
    path.join(
      NODE_ENV === 'development'
        ? path.join(__dirname, '..', '..', '..', 'client', 'build', 'static')
        : path.join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'client',
            'build',
            'static',
          ),
    ),
  ),
);

app.use(
  session({
    store: new SequelizeStore({
      db: db.sequelize,
    }),
    secret: SESSION_SECRET || 'secret',
    resave: false,
    unset: 'destroy',
    saveUninitialized: false,
    cookie: { ...cookieSettings, maxAge: 1800000 },
    name: 'session',
  }),
);

app.use(csurf({ sessionKey: 'session' }));

app.use(passport.initialize());
app.use(passport.session());

// Error handler for invalid/expired CSRFTokens, sends 403 response
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  return res.status(403).json({ csrf: true });
});

setupRoutes(app);

export default app;
