import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import bcrypt from 'bcrypt';

/**
 * 验证用户数据
 */
export const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('👤 验证用户数据');

  // 准备数据
  const { name, password } = req.body;

  // 验证必填数据
  if (!name) return next(new Error('NAME_REQUIRED'))
  if (!password) return next(new Error('PASSWORD_REQUIRED'))

  // 验证用户名
  const user = await userService.getUserByName(name);
  if (user) return next(new Error('USER_ALREADY_EXIST'));

  next();
}

/**
 * HASH 密码
 */
export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { password } = req.body;

  // Hash password
  req.body.password = await bcrypt.hash(password, 10);

  next();
}