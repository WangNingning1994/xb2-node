import { Request, Response, NextFunction } from 'express'
import { getPosts } from './post.service';

/**
 * 内容列表处理器
 */

export const index = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization !== 'SECRET') {
    return next(new Error('oops'));
  }

  const posts = getPosts();
  res.send(posts);
}