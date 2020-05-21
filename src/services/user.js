/**
 * @description user service 
 * @author sswq
 */

const {User} = require('../db/model/index')
const {formatUser} = require('./_format')

/**
 * @description 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password){
    whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    // 查询
    const result = await User.findOne({
        attributes:['id','userName','nickName','picture','city'],
        where: whereOpt
    })
    
    debugger
    if(result === null) {
        // 未找到
        return result
    }

    const formatRes = formatUser(result.dataValues)
    return formatRes
}


module.exports = {
    getUserInfo
}