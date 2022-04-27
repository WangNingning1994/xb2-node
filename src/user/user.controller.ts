import { Request, Response, NextFunction } from "express";
import { UserModel } from "./user.model";
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
    res.status(201).send(data);
  } catch (error) {
    // 创建数据库表格的时候，给 name 设置了 UNIQUE 限制
    // 若调用接口的时候传递的数据里，name 字段值在表格里已经存在了
    // 便会报错
    next(error);
  }
};
