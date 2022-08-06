import path from 'path';
import fs from 'fs';
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
      ...req.fileMetaData,
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

    // 要提供的图像尺寸
    let { size } = req.query; // e.g. ?size=thumbnail
    size = size as string;

    // 文件名与目录
    let filename = file.filename;
    let root = 'uploads';
    let resized = 'resized';

    if (size) {
      // 可用的图像尺寸
      const imageSizes = ['large', 'medium', 'thumbnail'];
      // 检查文件尺寸是否可用，例如用户输入ex-large
      if (!imageSizes.includes(size)) {
        throw new Error('FUCK_FILE_NOT_FOUND');
      }
      // 检查文件是否存在
      const fileExist = fs.existsSync(
        path.join(root, resized, `${filename}-${size}`),
      );
      // 设置文件名与目录
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resized);
      }
    }

    // 做出响应
    res.sendFile(filename, {
      root,
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 文件信息
 */
export const metadata = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fileId } = request.params;
  try {
    // 查询文件数据
    const file = await findFileById(parseInt(fileId, 10));
    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);
    response.send(data);
  } catch (error) {
    next(error);
  }
};
