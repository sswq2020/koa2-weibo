/**
 * @description 用户关系 controller
 * @author sswq
 */

const {getUserByFollower} = require('../services/user-relation')
const { createSuccessData } = require('../model/ResModel')

/**
 * @description 获取粉丝
 * @param {number} userId 用户Id
 */
async function getFans(userId){
    const result = await getUserByFollower(userId)
    return createSuccessData(result)
    //service
}

module.exports = {
    getFans
}