import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';

/**
 * create Multer
 */
const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');

/**
 * 文件处理器
 */
export const fileProcessor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let image: Jimp;
  try {
    const { path } = req.file;
    image = await Jimp.read(path);
  } catch (error) {
    return next(error); // 交给应用的默认异常处理器
  }

  // 准备文件数据
  const { imageSize, tags } = image['_exif'];
  // 在请求中添加文件数据
  req.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  // 下一步
  next();
};
