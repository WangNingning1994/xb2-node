import express from 'express';
import { defaultErrorHandler } from './app.middleware';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../auth/auth.router';

/**
 * create app
 */
const app = express();

/**
 * use middleware to handle JSON data
 */
app.use(express.json());

/**
 * 使用接口（或称路由）
 */
app.use(postRouter, userRouter, authRouter);

// 这个似乎必须放在末尾，放在上面不工作
/**
 * use middleware to handle error
 */
app.use(defaultErrorHandler);

/**
 * export app
 */
export default app;
