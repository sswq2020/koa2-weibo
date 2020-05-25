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
    let whereOpt = {
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

/**
 * @description 删除用户
 * @param {*} userName 
 */
async function deleteUser(userName){
    const result = await User.destroy({
        where:{
            userName
        }
    })
    // 返回删除的行数
    return result > 0 
}


/**
 * @description  修改用户信息
 * @param {Object} param0 要修改的内容 {newPassword,newNickName,newPicture,newCity}
 * @param {Object} city 查询条件 {userName password}
 */
async function updateUser({
    newPassword,newNickName,newPicture,newCity
},{
    userName,password
}){

    let updateData = {}
    if(newPassword){
        updateData.password = newPassword
    } 
    if(newNickName){
        updateData.nickName = newNickName
    }     
    if(newPicture){
        updateData.picture = newPicture
    } 
    if(newCity){
        updateData.city = newCity
    } 

    let whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    const result = await User.update(updateData,{
        where:whereOpt
    })

    return result[0] > 0
}


module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}