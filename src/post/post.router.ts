import express from 'express'
import * as postController from './post.controller'
import { requestUrl } from '../app/app.middleware';
import { authGuard, accessControl } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 接口：获取内容列表, 在交由 postController 处理前先由中间间 requestUrl 处理
 */
router.get('/posts', requestUrl, postController.index);

/**
 * 接口：创建内容
 */
router.post('/posts', authGuard, postController.store);

/**
 * 接口：更新内容
 */
router.patch('/posts/:postId', authGuard, accessControl({ possession: true }), postController.update);

/**
 * 接口：删除内容
 */
router.delete('/posts/:postId', authGuard, accessControl({ possession: true }), postController.destroy);

/**
 * 导出路由
 */
export default router;

