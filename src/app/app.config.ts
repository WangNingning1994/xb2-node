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
