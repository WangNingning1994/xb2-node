import dotenv from 'dotenv';

dotenv.config();

/**
 * export config
 */
export const { 
  // 端口号
  APP_PORT,
  // 数据仓库配置
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
} = process.env;

export let { PRIVATE_KEY, PUBLIC_KEY } = process.env;

PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString();
PUBLIC_KEY = Buffer.from(PUBLIC_KEY, 'base64').toString();