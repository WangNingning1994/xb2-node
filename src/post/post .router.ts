import express from 'express'
import * as postController from './post.controller'
import { requestUrl } from '../app/app.middleware';

const router = express.Router();

/**
 * 内容列表, 在交由 postController 处理前先由中间间 requestUrl 处理
 */
router.get('/posts', requestUrl, postController.index);

/**
 * 导出路由
 */
export default router;

