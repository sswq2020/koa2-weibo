/**
 * @description 用户关系 单元测试
 * @author sswq
 */

 const server = require('../server')
 const {getFans,getFollowers} = require('../../src/controller/user-relation')

 const {
    S_ID,
    S_COOKIE,
    S_USER_NAME,
    V_ID,
    V_COOKIE,
    V_USER_NAME   
 } = require('../testUserInfo')


 test('无论如何,先取消关注，应该成功', async ()=>{
    const res = await server
    .post('/api/profile/unfollow')
    .send({userId:V_ID})
    .set('cookie',S_COOKIE)
     expect(1).toBe(1)
 })


 // 添加关注
 test('sswq关注vivo,应该成功', async ()=>{
    const res = await server
    .post('/api/profile/follow')
    .send({userId:V_ID})
    .set('cookie',S_COOKIE)
    expect(res.body.errno).toBe(0)      
 })


 // 获取粉丝
 test('获取vivo粉丝,应该有sswq', async ()=>{
    const res = await getFans(V_ID)
    const {count,fansList} = res.data
    const hasUserName = fansList.some(fan => fan.id = S_ID)
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
 })

  // 获取关注的博主
  test('获取sswq关注的博主,应该有vivo', async ()=>{
    const res = await getFollowers(S_ID)
    const {count,followersList} = res.data
    const hasUserName = followersList.some(follower => follower.id = V_ID)
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
 })


 test('sswq取消关注vivo，应该成功', async ()=>{
    const res = await server
    .post('/api/profile/unfollow')
    .send({userId:V_ID})
    .set('cookie',S_COOKIE)
    expect(res.body.errno).toBe(0)  
 })