/**
 * @description 用户关系 controller
 * @author sswq
 */

const {getUserByFollower,addFollower,cancelFollower} = require('../services/user-relation')
const { createSuccessData,createErrorData } = require('../model/ResModel')
const {addFollowerFailInfo,deleteFollowerFailInfo} = require('../model/ErrorInfo')

/**
 * @description 获取粉丝
 * @param {number} userId 用户Id
 */ 
async function getFans(userId){
    const result = await getUserByFollower(userId)
    return createSuccessData(result)
}

/**
 * @description 关注此用户
 * @param {number} followerId 准备关注的用户ID
 * @param {number} myUserId 当前登录用户ID
 */
async function follow(followerId,myUserId){
    //service
    try {
        await addFollower(followerId,myUserId)
        return createSuccessData()
    } catch (ex) {
        console.log(ex.message, ex.stack)
        return createErrorData(addFollowerFailInfo)
    }
}

/**
 * @description 取消关注此用户
 * @param {number} followerId 关注的用户ID
 * @param {number} myUserId 当前登录用户ID
 */
async function unfollow(followerId,myUserId){
    //service
    const res = await cancelFollower(followerId,myUserId)
    if(res){
        return createSuccessData()
    }else {
        return createErrorData(deleteFollowerFailInfo)
    }
}

module.exports = {
    getFans,
    follow,
    unfollow
}