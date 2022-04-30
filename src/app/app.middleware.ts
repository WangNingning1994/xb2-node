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
  if (error.message) console.log(error.message);
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400; // bad request
      message = 'Please provide your name';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400; // bad request
      message = 'Please provide your password';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409; // conflict
      message = 'Name already exists.';
      break;
    case 'USER_DOES_NOT_EXIST':
      statusCode = 400;
      message = 'User does not exist.';
      break;
    case 'PASSWORD_DOES_NOT_MATCH':
      statusCode = 400;
      message = 'Wrong password';
      break;
    case 'UNAUTHORIZED':
      statusCode = 401; // unauthorized
      message = 'Unauthorized!';
      break;
    case 'USER_DOES_NOT_OWN_RESOURCE':
      statusCode = 403; // forbidden
      message = '您不能处理这个内容';
      break;
    default:
      statusCode = 500; // 服务器内部错误
      message = 'Oops, something went wrong. -_-#';
      break;
  }
  res.status(statusCode).send({ message });
};

export { logRequestUrl, defaultErrorHandler };
