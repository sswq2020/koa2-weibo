/**
 * @description user controller
 * @author sswq
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const {
    deleteUserFailInfo,
    registerUserNameNotExitInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    changeInfoFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
  * @description 用户名是否存在
  * @param {string} userName 
  */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return createSuccessData(userInfo)
    } else {
        return createErrorData(registerUserNameNotExitInfo)
    }
}

/**
  * @description 注册
  * @param {string} userName
  * @param {string} password 
  * @param {number} gender 性别(1 男性 2 女性 3保密)
  */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return createErrorData(registerUserNameExistInfo)
    }
    // 注册service
    try {
        await createUser(
            {
                userName,
                password: doCrypto(password),
                gender
            })
        return createSuccessData()

    } catch (ex) {
        console.log(ex.message, ex.stack)
        return createErrorData(registerFailInfo)
    }
}

/**
 * @description 登录
 * @param {Object} ctx    koa.ctx 上下文对象
 * @param {string} userName
 * @param {string} password 
 */
async function login({ ctx, userName, password }) {
    // 登录成功 ctx.session.userInfo = xxx
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return createErrorData(loginFailInfo)
    }
    if (ctx.session.userInfo === null || ctx.session.userInfo === undefined) {
        ctx.session.userInfo = userInfo
    }
    return createSuccessData()
}

/**
 * 
 * @param {string} userName 用户名 
 */
async function deleteCurUser(ctx,userName) {
    const result = await deleteUser(userName)
    // service
    if (result) {
        ctx.session.userInfo = null
        return createSuccessData()
    } else {
        return createErrorData(deleteUserFailInfo)
    }
}

/**
 * @description 修改用户信息
 * @param {string} nickName 昵称 
 * @param {string} city 城市 
 * @param {string} picture 头像图片 
 * @param {string} userName 用户名 
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if(!nickName){nickName = userName}
    const result = await updateUser({
        newNickName:nickName,
        newCity:city,
        newPicture:picture
    },{
        userName
    })
    // service
    if (result) {
        // const userInfo = await getUserInfo(userName)
        // ctx.session.userInfo = userInfo
        Object.assign(ctx.session.userInfo,{
            nickName, city, picture
        })
        return createSuccessData()
    } else {
        return createErrorData(changeInfoFailInfo)
    }
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}