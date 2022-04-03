const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('starting service');
})

app.get('/', (req, res) => {
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

app.get('/posts', (req, res) => {
  res.send(data)
})

app.get('/posts/:postId', (req, res) => {
  // get params from header
  const { postId } = req.params;

  // filter
  const posts = data.filter(item => item.id == postId);

  // responsse
  res.send(posts[0])
})
