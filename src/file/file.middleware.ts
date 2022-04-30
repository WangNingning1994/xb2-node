import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * create Multer
 */
const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
