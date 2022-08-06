import { Request, Response, NextFunction } from 'express';

/**
 * log request url, demo usage of middleware
 */

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
};

/**
 * default error handler
 */

export const defaultErrHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message) {
    console.log('Fucking Error: ', err.message);
  }

  let statusCode: number, message: string;
  switch (err.message) {
    case 'NAME_REQUIRED':
      statusCode = 400; // bad request
      message = 'Enter your fucking name';
      break;
    case 'PASSWORD_REQUIRED':
      statusCode = 400; // bad request
      message = 'Enter your fucking password';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409; // conflict
      message = 'You fucking name has been taken by others';
      break;
    case 'USER_DOES_NOT_EXIST':
      statusCode = 400;
      message = 'No fucking user matched';
      break;
    case 'PASSWORD_DOES_NOT_MATCH':
      statusCode = 400;
      message = 'Wrong password';
      break;
    case 'UNAUTHORIZED':
      statusCode = 401;
      message = 'please login first';
      break;
    case 'USER_DOES_NOT_OWN_RESOURCE':
      statusCode = 403;
      message = 'you cant handle this';
      break;
    case 'FUCK_FILE_NOT_FOUND':
      statusCode = 404;
      message = 'fuck you, file not found';
      break;
    case 'TAG_ALREADY_EXISTS':
      statusCode = 400;
      message = 'fuck you, tag already exists.';
      break;
    case 'POST_ALREADY_HAS_THIS_TAG':
      statusCode = 400;
      message = 'fuck you, post already has this tag.';
      break;
    default:
      statusCode = 500;
      message = '😅 Oops, something shit happened!';
      break;
  }
  res.status(statusCode).send({ message });
};
