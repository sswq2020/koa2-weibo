/**
 * @description sequelize 实例
 * @author sswq
 */


const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd,isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

// 测试环境下sequelize不需要输出sql语句 
if(isTest) {
    conf.logging = () =>{}
}


//线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的链接数量
        min: 0,
        idle: 10000 // 如果一个连接池 10s没被使用,将被释放
    }
}


const seq = new Sequelize(database, user, password, conf)

module.exports = seq

// 测试连接
// seq.authenticate().then(()=>{
//     console.log('ok')
// }).catch(()=>{
//     console.log('err')
// })