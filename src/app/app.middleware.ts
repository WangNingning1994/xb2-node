import { Request, Response, NextFunction } from 'express' 

/**
 * log request url, demo usage of middleware
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
  if (err.message) {
    console.log('Fuck Error: ', err.message)
  }

  let statusCose: number, message: string;
  switch (err.message) {
    case 'NAME_REQUIRED':
      statusCose = 400; // bad request
      message = 'Enter your fucking name';
      break;
    case 'PASSWORD_REQUIRED':
      statusCose = 400; // bad request
      message = 'Enter your fucking password';
      break;
    case 'USER_ALREADY_EXIST':
      statusCose = 409; // conflict
      message = 'You fucking name has been taken by others';
      break;
    default:
      statusCose = 500;
      message = '😅 Oops, something shit happened!';
      break;
  }
  res.status(statusCose).send({message});
}
