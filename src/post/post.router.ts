import express from 'express';
import { logRequestUrl } from '../app/app.middleware';
import { authGuard, accessControl } from '../auth/auth.middleware';
import * as postController from './post.controller';

const router = express.Router();

/**
 * 内容列表
 */
// 接口的第一个参数是地址，最后一个参数是处理器，中间的都可视作中间件
router.get('/posts', logRequestUrl, postController.index);

/**
 * 创建内容
 */
router.post('/posts', authGuard, postController.store);

/**
 * 更新内容
 */
router.patch(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.update,
);

/**
 * 删除内容
 */
router.delete(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.destroy,
);

export default router;
