import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';

/**
 * 验证用户登录数据
 */
export const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('👤 验证登录数据');

  // 准备数据
  const { name, password } = req.body;

  // 验证必填数据
  if (!name) return next(new Error('NAME_REQUIRED'))
  if (!password) return next(new Error('PASSWORD_REQUIRED'))

  // 验证用户是否存在
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));

  // 验证用户密码
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));

  // 在请求主体里添加用户
  req.body.user = user;

  next();
}

/**
 * 验证 token
 */
// type ExtendedRequest = Request & { Authorization: String };
export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('===验证token===');
  try {
    const authorization = req.header('Authorization');
    if (!authorization) throw new Error();

    // 提取 jwt token
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    // 验证令牌
    const decoded =  jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });

    // 在请求里添加当前用户
    req.user = decoded as TokenPayload;

    // 下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'))    
  }

}

/**
 * 访问控制
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('===访问控制===');

    // 解构选项
    const { possession } = options;

    // 当前用户 ID
    const { id: userId } = req.user;

    // 放行管理员
    if (userId == 1) return next();

    // 准备资源
    const resourceIdParam = Object.keys(req.params)[0];
    const resourceType = resourceIdParam.replace('Id', '');
    const resourceId = parseInt(req.params[resourceIdParam], 10);

    // 检查资源拥有权
    if (possession) {
      try {
        const ownResource = await possess({ resourceId, resourceType, userId });
        if (!ownResource) {
          return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next(error);
      }
    }

    // 下一步
    next();
  }
}