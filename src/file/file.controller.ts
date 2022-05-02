import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { createFile, findFileById } from './file.service';

/**
 * 上传文件
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // current user:
  const { id: userId } = req.user;

  // 所属内容
  const { post: postId } = req.query;

  // 文件信息
  const fileInfo = _.pick(req.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);

  try {
    // 保存文件信息
    const data = await createFile({
      ...fileInfo,
      userId,
      postId,
    });
    // 做出响应
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 文件服务
 */
export const serve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 从地址参数里得到文件ID
  const { fileId } = req.params;

  try {
    // 查找文件信息
    const file = await findFileById(parseInt(fileId, 10));

    // 做出响应
    res.sendFile(file.filename, {
      root: 'uploads',
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
