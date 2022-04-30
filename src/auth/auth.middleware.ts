import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';

const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
};

/**
 * 验证用户身份
 */
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
};

/**
 * 访问控制
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  // 用这个函数返回另外一个函数，让被返回的函数可以使用options参数，
  // 这其实就是闭包的概念
  // 调用accessControl，用其返回的结果（另一个函数）作为参数
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('=== 访问控制 ===');
    const { possession } = options;
    // 当前用户id
    const { id: userId } = req.user;

    // pass super admin
    if (userId == 1) {
      return next();
    }
    // 准备资源
    const resourceIdParam = Object.keys(req.params)[0];
    const resourceType = resourceIdParam.replace('Id', '');
    const resourceId = parseInt(req.params[resourceIdParam], 10);
    // 检查资源拥有权
    if (possession) {
      try {
        const ownResource = await possess({ resourceId, resourceType, userId });
        console.log(ownResource);
        if (!ownResource) {
          return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next();
      }
    }
    // 这个别忘记了哦
    next();
  };
};

export { validateLoginData, authGuard };
