import express from 'express';
import passport from 'passport';
import setupRoutes from '../routes/index';

require('./passport');

const app = express();

app.use(passport.initialize());

setupRoutes(app);

export default app;
