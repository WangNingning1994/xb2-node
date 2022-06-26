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
};

/**
 * 按用户名查找用户
 */
interface GetUserOptions {
  password?: boolean;
}
export const getUserByName = async (
  name: string,
  options: GetUserOptions = {},
) => {
  // 准备选项
  const { password } = options;

  // 准备SQL
  const statement = `
    SELECT 
      id,
      name
      ${password ? ', password' : ''}
    FROM user
    WHERE name = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, name);

  // 提供数据
  return data[0];
};

export const getUserById = async (id: string) => {
  // 准备SQL
  const statement = `
    SELECT 
      id,
      name
    FROM user
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, id);

  // 提供数据
  return data[0];
};
