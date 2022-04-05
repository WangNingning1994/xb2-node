// service 用以缓解controller的压力
/**
 * 获取内容列表
 */

const getPosts = () => {
  const data = [
    {
      content: 'Andy Warhol'
    },
    {
      content: 'Norman Rockwell'
    },
    {
      content: 'Marcus'
    }
  ]
  return data;
}

export { getPosts };