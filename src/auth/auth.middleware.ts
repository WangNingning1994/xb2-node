import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';

const validateLoginData = async (req: Request, res: Response, next: NextFunction) => {
  const { name, password } = req.body;

  // 验证必填项
  if (!name) {
    return next(new Error('NAME_IS_REQUIRED'));
  }
  if (!password) {
    return next(new Error('PASSWORD_IS_REQUIRED'));
  }

  // 验证用户是否存在
  const user = await userService.getUserByName(name, { password: true });
  // 这里和创建于用户的中间件有细微差异：创建那边是验证用户是否已经存在，若已经存在，不允许注册
  // 这里是验证，若不存在，不允许登录

  if (!user) {
    return next(new Error('USER_DOES_NOT_EXIST'));
  }

  // 存在了，密码和用户输入的匹配吗？
  // 这里和我过往 mindset 里有所区别的一点是：
  // 后端并不是直接拿着密码和用户名去查找，而是拿着用户名查找到一条记录后
  // 用 bcrypt 自带的 compare 方法比对明文的密码和加密后的密码

   // 验证用户密码
   const matched = await bcrypt.compare(password, user.password);
   if (!matched) {
     return next(new Error('PASSWORD_DOES_NOT_MATCH'));
   }

  console.log('=== User Data: ===');
  console.log(user);

  req.body.user = user;

  // 这里还要加一下 next(), 不然请求就卡住了
  next();
}

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 提取 Authorization
    const authorization = req.header('Authorization');
    if (!authorization) throw new Error();

    // 提取jwt令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    // 验证令牌
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    req.user = decoded as TokenPayload;
    console.log(req.user);

    // 下一步
    next();
  } catch (error) {
    // 下一步
    next(new Error('UNAUTHORIZED'));
  }

}

export { validateLoginData, authGuard }
