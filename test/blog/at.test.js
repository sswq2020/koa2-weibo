/**
 * @description atMe api test
 * @author sswq
 */

const server = require('../server')
const {S_COOKIE,V_COOKIE,V_USER_NAME,S_ID,V_ID} = require('../testUserInfo')
let BLOG_ID = ''

test('sswq创建一条微博 @vivo 应该成功',async () =>{
    const content = '单元测试自动创建微博 @vivo - ' + V_USER_NAME
    const res = await server
          .post('/api/blog/create')
          .send({content})
          .set('cookie',S_COOKIE)

    expect(res.body.errno).toBe(0)
    // 记录微博 id
    BLOG_ID = res.body.data.id
})


test('获取 vivo @列表,应该有刚刚创建的微博',async () =>{
    const res = await server
          .get('/api/atMe/loadMore/0') // 列表时倒叙排列
          .set('cookie',V_COOKIE)

    expect(res.body.errno).toBe(0)
    const {blogList}  = res.body.data
    const isHaveCurBlog = blogList.some(blog => {
        return blog.id === BLOG_ID
    })
    expect(isHaveCurBlog).toBe(true)
    // 记录微博 id
    BLOG_ID = res.body.data.id
})