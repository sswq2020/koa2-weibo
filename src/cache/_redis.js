/**
 * @description 连接 redis的方法 get set
*/

const redis = require('redis')
const { REDIS_CONF }  = require('../conf/db')

//创建一个redis客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('err',err=>{
    console.log('redis error',err)
})

/**
  * @description redis set
  * @param {string} key 键
  * @param {string} val 值
  * @param {number} timeout 过期时间 单位s
  */
function set(key,val,timeout = 60 * 60){
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    redisClient.expire(key, timeout)
}

/**
  * @description redis get
  * @param {string} key 键 
  */
function get(key){
    const promise = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val===null){
                resolve(val)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports= {
    get,
    set
}