import { Request, Response, NextFunction } from 'express' 

/**
 * log request url
 */

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
}

/**
 * default error handler
 */

export const defaultErrHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCose: number, message: string;
  switch (err.message) {
    default:
      statusCose = 500;
      message = '你猜怎么着, 服务器挂了哟';
      break;
  }
  res.status(statusCose).send({message});
}
