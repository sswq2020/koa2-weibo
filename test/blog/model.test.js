/**
 * @description weibo model test
 * @author sswq
 */

const {Blog} = require('../../src/db/model/index')

test('Blog 模型的各个属性,符合预期',()=>{
    // build会构建一个内存的Blog实例,但不会提交到数据库中
   const user = Blog.build({
       userId:1,
       content:'微博内容',
       image:'/xxx.png'
   })

   expect(user.userId).toBe(1)
   expect(user.image).toBe('/xxx.png')
   expect(user.content).toBe('微博内容')

})