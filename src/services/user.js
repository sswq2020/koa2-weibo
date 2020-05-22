/**
 * @description user service 
 * @author sswq
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * @description 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
    whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result === null) {
        // 未找到
        return result
    }

    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * @description  注册用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    return result.dataValues
}


module.exports = {
    getUserInfo,
    createUser
}