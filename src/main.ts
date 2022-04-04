import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

/**
 *  middleware for handling json format data from client side
 */
app.use(express.json());

app.listen(port, () => {
  console.log('starting service');
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world')
})

const data = [
  {
    id: 1,
    name: 'Andy'
  },
  {
    id: 2,
    name: 'Jack'
  }
]

app.get('/posts', (req: Request, res: Response) => {
  res.send(data)
})

app.get('/posts/:postId', (req, res) => {
  // get params from header
  const { postId } = req.params;

  // filter
  const posts = data.filter(item => item.id == parseInt(postId));

  // responsse
  res.send(posts[0])
})

/**
 * 创建内容
 */
app.post('/posts', (req: Request, res: Response) => {
  // 获取请求里的数据
  const { content } = req.body;
  
  // 获取请求头数据
  const areYouOK = req.headers['are-you-ok'];
  console.log(`Are you ok? ${ areYouOK }`);

  // 设置响应头数据
  res.set('Are-you-ok', 'No');

  // 设置状态码
  res.status(201);
  // 作出响应
  res.send({
    message: `成功创建了内容：${content}`
  })
})