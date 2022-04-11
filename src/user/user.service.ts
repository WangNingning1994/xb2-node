import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

// service 用以缓解controller的压力

/**
 *  创建用户
 */
export const createUser = async (user: UserModel) => {
  // 准备查询
  const statement = `
    INSERT INTO user 
    SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, user);

  // 返回数据
  return data;
}

/**
 * 按用户名查找用户
 */
export const getUserByName = async (name: string) => {
  // 准备SQL
  const statement = `
    SELECT id, name
    FROM user
    WHERE name = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, name);

  // 提供数据
  return data[0];
}
