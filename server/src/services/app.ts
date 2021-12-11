import express from 'express';
import cors from 'cors';
import path from 'path';
import csurf from 'csurf';
import passport from 'passport';
import session from 'express-session';
import MemoryStore from 'memorystore';
import setupRoutes from '../routes/index';

require('./passport');

const { NODE_ENV, SESSION_SECRET, CLIENT_DEV_URL } = process.env;
const app = express();

const cookieSettings: session.CookieOptions = {};
if (NODE_ENV !== 'development') {
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
    store: new (MemoryStore(session))({
      checkPeriod: 84600,
    }),
    secret: SESSION_SECRET || '',
    resave: false,
    saveUninitialized: true,
    cookie: cookieSettings,
    name: 'session',
  }),
);

app.use(
  csurf({
    sessionKey: 'session',
  }),
);

app.use(passport.initialize());

setupRoutes(app);

export default app;
