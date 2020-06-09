/**
 * @description 微博 @ 关系 controller
 * @author sswq
 */

const { createSuccessData, createErrorData } = require('../model/ResModel')
const {getAtRelationCount} = require('../services/at-relation')


/**
  * 获取 @ 我的微博数量
  * @param {number} userId 
  */
async function getAtMeCount(userId){
    // service
    const {count} = await getAtRelationCount(userId)
    return createSuccessData({count})
} 


module.exports = {
    getAtMeCount
}