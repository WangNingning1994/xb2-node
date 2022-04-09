import app from './app' // no need to specify index.js(ts)
import { APP_PORT } from './app/app.config'
import { connection } from './app/database/mysql'

app.listen(APP_PORT, () => {
  console.log('starting service...');
})

/**
 * 测试使用数据服务连接
 */
connection.connect(err => {
  if (err) {
    console.log('连接数据服务失败：', err.message);
    return
  }
  console.log('成功连接数据服');
})