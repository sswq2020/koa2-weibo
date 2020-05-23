/**
 * @description user controller
 * @author sswq
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const {
    deleteUserFailInfo,
    registerUserNameNotExitInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo } = require('../model/ErrorInfo')
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

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}