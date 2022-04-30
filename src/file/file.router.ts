import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as fileRouter from './file.controller';
import { fileInterceptor } from './file.middleware';

const router = express.Router();

router.post('/files', authGuard, fileInterceptor, fileRouter.store);

/**
 * 导出路由
 */
export default router;
