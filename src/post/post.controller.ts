import { Request, Response, NextFunction } from 'express';
import { getPosts, createPost, updatePost, deletePost } from './post.service';

import _ from 'lodash';

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
  const { id: userId } = req.user;
  // 创建内容
  try {
    const data = await createPost({ title, content, userId });
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

  // 准备数据 - 通过 lodash 提供的方法来组装对象
  const post = _.pick(req.body, ['title', 'content']);
  console.log('=== post object: ===');
  console.log(post);

  // 创建内容
  try {
    console.log('=== Updating ===');
    const data = await updatePost(parseInt(postId, 10), post);
    res.send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * 删除内容
 */
export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  // 获取内容 ID
  const { postId } = req.params;

  // 删除内容
  try {
    // 此处的 data 是 service 里的数据库驱动执行完 SQL 后返回的值
    const data = await deletePost(parseInt(postId, 10)); 
    res.send(data);
  } catch (error) {
    next(error); 
  }
}
