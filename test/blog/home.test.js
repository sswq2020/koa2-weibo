/**
 * @description blog-home api test
 * @author sswq
 */

const server = require('../server')
const {S_COOKIE} = require('../testUserInfo')
let BLOG_ID = ''
// 注册
test('创建一条微博,应该成功', async () => {
    //定义测试内容
    const content = `单元测试自动创建的微博${Date.now()}`
    const image = './xxx.png'
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie',S_COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    // 记录微博 id
    BLOG_ID = res.body.data.id
})


test('微博主页,加载第一页数据,应该成功',async () =>{
    const res = await server
          .get(`/api/blog/loadMore/0`)
          .set('cookie',S_COOKIE)

    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})