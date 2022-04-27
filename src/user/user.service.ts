import { connection } from "../app/database/mysql";
import { UserModel } from "./user.model";

/**
 * 定义接口的一般流程：创建 controller 所使用的服务、创建 controller、定义路由
 * 如果数据在到达 controller 之前还需要做处理，可以添加中间件
 */

/**
 * 按用户名查找用户
 */
export const getUserByName = async (name: string) => {
  // 准备查询
  const statement = `
    SELECT id, name 
    FROM user
    WHERE name = ? 
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, name);

  console.log('=== get user by name: ===');
  console.log(data);

  // 提供数据
  return data[0];
};

/**
 * 创建用户
 */
export const createUser = async (user: UserModel) => {
  // 准备查询
  const statement = `
    INSERT INTO user
    SET ?
  `;

  // 执行查询 
  const [data] = await connection.promise().query(statement, user);

  // 提供数据
  return data;
}