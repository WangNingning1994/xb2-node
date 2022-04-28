import { Request, Response, NextFunction } from 'express';
import { identity } from 'lodash';
import { signToken } from './auth.service';

const login = (req: Request, res: Response, next: NextFunction) => {
  const {
    user: { id, name },
  } = req.body; // 这个是在上一个中间件里加入的数据
  const payload = { id, name };
  try {
    // 签发令牌
    const token = signToken({ payload });
    // 做出响应
    res.send({ id, name, token });
  } catch (error) {
    next(error);
  }
}

/**
 * 验证登录
 */
const validate = (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
}

export { login, validate }