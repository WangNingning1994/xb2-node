import express from 'express';
import { logRequestUrl } from '../app/app.middleware';
import * as postController from './post.controller';

const router = express.Router();

/**
 * 内容列表
 */
// 接口的第一个参数是地址，最后一个参数是处理器，中间的都可视作中间件
router.get('/posts', logRequestUrl, postController.index);

export default router;
