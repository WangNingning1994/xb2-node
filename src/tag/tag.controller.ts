import { Request, Response, NextFunction } from 'express';
import { createTag, getTagByTagName } from './tag.service';

/**
 * 创建标签
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { name } = req.body;
  try {
    // 查找标签
    const tag = await getTagByTagName(name);

    // 如果标签存在就报错
    if (tag) throw new Error('TAG_ALREADY_EXISTS');

    // 存储标签
    const data = await createTag({ name });

    // 做出响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
