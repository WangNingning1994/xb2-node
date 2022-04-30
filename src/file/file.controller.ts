import { Request, Response, NextFunction } from 'express';

/**
 * 上传文件
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.file);
  res.sendStatus(200);
};
