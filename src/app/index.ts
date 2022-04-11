import express from 'express';
import postRouter from '../post/post.router'
import userRouter from '../user/user.router'
import { defaultErrHandler } from './app.middleware'

/**
 * create app
 */
const app = express();

/**
 * use middleware to handle JSON data
 */

app.use(express.json());

/**
 * router
 */
app.use(postRouter, userRouter);

/**
 * error handler
 */
app.use(defaultErrHandler);

/**
 * export app
 */

export default app;