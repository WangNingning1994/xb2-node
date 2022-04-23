import { Request, Response, NextFunction } from 'express';

/**
 * 内容列表
 */
export const index = (req: Request, res: Response, next: NextFunction) => {
  res.send('内容列表接口');
};
