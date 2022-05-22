import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';
import fileRouter from '../file/file.router';
import { defaultErrHandler } from './app.middleware';

import cors from 'cors';

/**
 * create app
 */
const app = express();

/**
 * handle cors
 */
app.use(cors());

/**
 * use middleware to handle JSON data
 */

app.use(express.json());

/**
 * router
 */
app.use(postRouter, userRouter, authRouter, fileRouter);

/**
 * error handler
 */
app.use(defaultErrHandler);

/**
 * export app
 */

export default app;
