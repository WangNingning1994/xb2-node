import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';

/**
 * 创建内容
 */
const createPost = async (post: PostModel) => {
  // 准备SQL
  const statement = `
    INSERT INTO post
    SET ?
  `;
  // 执行创建
  const [data] = await connection.promise().query(statement, post);
  // 提供数据
  return data;
};

/**
 * 获取内容列表
 */
const getPosts = async () => {
  const statement = `
    SELECT
      post.id,
      post.title,
      post.content,
      JSON_OBJECT (
        'id', user.id,
        'name', user.name
      ) as user
      FROM post
      LEFT JOIN user
        ON user.id = post.userId
  `;
  const [data] = await connection.promise().query(statement);

  return data;
};

/**
 * 更新内容
 */
const updatePost = async (postId: number, post: PostModel) => {
  // 准备SQL语句
  const statement = `
    UPDATE post
    SET ?
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);

  // 提供数据
  return data;
}

export { getPosts, createPost, updatePost };
