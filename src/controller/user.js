/**
 * @description user controller
 * @author sswq
 */

const { getUserInfo, createUser } = require('../services/user')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const { registerUserNameNotExitInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
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


module.exports = {
    isExist,
    register
}