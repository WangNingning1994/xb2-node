import { Request, Response, NextFunction } from 'express';
import { getPosts, createPost, updatePost } from './post.service';

/**
 * 创建内容
 */
export const store  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 准备数据
  const { title, content } = req.body;
  // 创建内容
  try {
    const data = await createPost({ title, content });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

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

/**
 * 更新内容
 */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  // 获取内容 ID
  const { postId } = req.params;

  // 准备数据
  const { title, content } = req.body;

  // 创建内容
  try {
    console.log('=== Updating ===');
    console.log(typeof content);
    const data = await updatePost(parseInt(postId, 10), { title, content });
    res.send(data);
  } catch (error) {
    next(error);
  }
}
