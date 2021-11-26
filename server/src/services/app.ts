import express from 'express';
import setupRoutes from '../routes/index';

const app = express();

setupRoutes(app);

export default app;
