/**
 * @description user controller
 * @author sswq
 */

const { getUserInfo } = require('../services/user')
const {createSuccessData,createErrorData} = require('../model/ResModel')
const {registerUserNameNotExitInfo} = require('../model/ErrorInfo')

/**
  * @description 用户名是否存在
  * @param {string} userName 
  */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return createSuccessData(userInfo)
    }else{
        return createErrorData(registerUserNameNotExitInfo)
    }
}

module.exports = {
    isExist
}