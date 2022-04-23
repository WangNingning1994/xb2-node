import express from 'express';
import postRouter from '../post/post.router';

/**
 * create app
 */
const app = express();

/**
 * use middleware to handle JSON data
 */
app.use(express.json());

/**
 * 使用接口，回想在express官网上看到过其称 router 为 mini app
 */
app.use(postRouter);

/**
 * export app
 */
export default app;
