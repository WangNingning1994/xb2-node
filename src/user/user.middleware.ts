import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import * as userService from './user.service';

/**
 * hash password
 */
const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { password } = req.body;
  // hash password
  req.body.password = await bcrypt.hash(password, 10);
  // 下一步
  next();
};

const validateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password } = req.body;

  // 验证必填项
  if (!name) {
    return next(new Error('NAME_IS_REQUIRED'));
  }
  if (!password) {
    return next(new Error('PASSWORD_IS_REQUIRED'));
  }

  // 验证用户名的唯一性
  const user = await userService.getUserByName(name);
  if (user) {
    return next(new Error('USER_ALREADY_EXIST'));
  }

  // 这里还要加一下 next(), 不然请求就卡住了
  next();
}

export { hashPassword, validateUserData }