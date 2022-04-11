import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as userService from './user.service';

/**
 * 创建用户
 */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 准备数据
  const { name, password } = req.body;

  // 创建用户
  try {
    const data = await userService.createUser({ name, password }); 
    // 此处的data是默认的成功信息
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
}
