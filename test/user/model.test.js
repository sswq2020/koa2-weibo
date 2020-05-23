/**
 * @description user model test
 * @author sswq
 */

 const {User} = require('../../src/db/model/index')

 test('User 模型的各个属性,符合预期',()=>{
     // build会构建一个内存的User实例,但不会提交到数据库中
    const user = User.build({
        userName:'zhangsan',
        password:'p121223',
        nickName:'张三',
        picture:'/xxx.png',
        city:'北京'
    })

    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p121223')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')

 })