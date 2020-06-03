/**
 * @description user api test
 * @author sswq
 */

 const server = require('../server')

 const userName = `u_${Date.now()}`
 const password = `p_${Date.now()}`

 const testUser = {
     userName,
     password,
     nickName:userName,
     gender:1
 }

 //存储 cookie
 let S_COOKIE = ""

 // 注册
 test('注册一个用户,应该成功',async ()=>{
     const res = await server
          .post('/api/user/register')
          .send(testUser)
    expect(res.body.errno).toBe(0)      
 })

 // 重复注册
 test('重复注册一个用户,应该失败',async ()=>{
    const res = await server
         .post('/api/user/register')
         .send(testUser)
   expect(res.body.errno).not.toBe(0)      
})


 // 查询注册的用户名是否存在
 test('查询注册的用户名,应该存在',async ()=>{
    const res = await server
         .post('/api/user/isExist')
         .send(testUser)
   expect(res.body.errno).toBe(0)      
})


// json schema 检测
test('json schema 检测,用户名为非法的的格式,注册应该失败',async ()=>{
    const res = await server
    .post('/api/user/register')
    .send(Object.assign({},testUser,{userName:'123'}))
expect(res.body.errno).not.toBe(0)     
})


// json schema 检测
test('json schema 检测,密码为非法的的格式,注册应该失败',async ()=>{
    const res = await server
    .post('/api/user/register')
    .send(Object.assign({},testUser,{password:12}))
expect(res.body.errno).not.toBe(0)     
})

// json schema 检测
test('json schema 检测,性别为非法的的格式,注册应该失败',async ()=>{
    const res = await server
    .post('/api/user/register')
    .send(Object.assign({},testUser,{gender:'mail'}))
expect(res.body.errno).not.toBe(0)     
})


 // 登录
 test('登录,应该成功',async ()=>{
    const res = await server
         .post('/api/user/login')
         .send(testUser)
   expect(res.body.errno).toBe(0)   

   S_COOKIE = res.headers['set-cookie'].join(';')

})

 // 修改基本信息
 test('修改基本信息应该成功', async ()=>{
   const res = await server
        .patch('/api/user/changeInfo')
        .send({
         nickName:'测试昵称', city:'测试城市', picture:'/test.png'
        })
        .set('cookie',S_COOKIE)
  expect(res.body.errno).toBe(0)   
})

 // 修改密码
 test('修改密码应该成功', async ()=>{
   const res = await server
        .patch('/api/user/changePassword')
        .send({
         password,
         newPassword: `p_${Date.now()}`
        })
        .set('cookie',S_COOKIE)
  expect(res.body.errno).toBe(0)   
})


 // 删除
 test('删除用户,应该成功',async ()=>{
    const res = await server
         .post('/api/user/delete')
         .set('cookie',S_COOKIE)
   expect(res.body.errno).toBe(0)   
})


 // 退出登录
 test('退出登录,应该成功',async ()=>{
   const res = await server
        .post('/api/user/logout')
        .set('cookie',S_COOKIE)
  expect(res.body.errno).toBe(0)   
})


 // 删除之后,再次查询注册的用户名
 test('删除之后,查询注册的用户名,应该不存在',async ()=>{
    const res = await server
         .post('/api/user/isExist')
         .send(testUser)
   expect(res.body.errno).not.toBe(0)      
})