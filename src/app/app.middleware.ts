import { Request, Response, NextFunction } from 'express';

const logRequestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log(`正在使用打印请求地址的中间件： ${req.url}`);
  next();
};

const defaultErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number, message: string;
  switch (error.message) {
    default:
      statusCode = 500;
      message = 'Oops, something went wrong. -_-#';
      break;
  }
  res.status(statusCode).send({ message });
};

export { logRequestUrl, defaultErrorHandler };
