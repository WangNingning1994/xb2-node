import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * 创建一个 Multer, 这玩意可以视作文件上传器
 */
const fileUpload = multer({
  dest: 'uploads/', // 存储上传文件的位置
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
