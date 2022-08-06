import { connection } from '../app/database/mysql';
import { TagModel } from './tag.model';

/**
 * Create tag
 */
const createTag = async (tag: TagModel) => {
  // 准备查询
  const statement = `
    INSERT INTO tag
    SET ? 
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, tag);

  return data as any;
};

const getTagByTagName = async (tagName: string) => {
  // 准备查询
  const statement = `
    SELECT id, name FROM tag
    WHERE name = ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, tagName);

  return data[0];
};

export { createTag, getTagByTagName };
