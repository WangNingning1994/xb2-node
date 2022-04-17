import { Request, Response, NextFunction } from 'express';
import { signToken } from './auth.service';

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 准备数据
  const {
    user: { id, name },
  } = req.body;

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
const validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  res.sendStatus(200);
}

export { login, validate };
