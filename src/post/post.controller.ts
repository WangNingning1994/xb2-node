import { Request, Response, NextFunction } from 'express';
import { getPosts } from './post.service';

/**
 * 内容列表
 */
export const index = async (req: Request, res: Response, next: NextFunction) => {
  // if (req.headers.authorization !== 'SECRET') {
  //   return next(new Error());
  // }
  try {
    const posts =  await getPosts();
    res.send(posts);
  } catch (error) {
    next(error);
  }
};
