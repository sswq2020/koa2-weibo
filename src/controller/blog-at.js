/**
 * @description 微博 @ 关系 controller
 * @author sswq
 */

const { createSuccessData, createErrorData } = require('../model/ResModel')
const {getAtRelationCount,getAtUserBlogList} = require('../services/at-relation')
const { PAGE_SIZE } = require('../conf/constant')

/**
  * 获取 @ 我的微博数量
  * @param {number} userId 
  */
async function getAtMeCount(userId){
    // service
    const {count} = await getAtRelationCount(userId)
    return createSuccessData({count})
} 

/**
 * @description  获取 @ 我的微博列表 分页
 * @param {number} userId 
 * @param {number} pageaIndex 
 */ 
async function getAtMeBlogList(userId,pageIndex = 0){
    //service
    const res = await getAtUserBlogList(userId,pageIndex,PAGE_SIZE)
    const {count,blogList} = res
    return createSuccessData({count,blogList,pageIndex,pageSize:PAGE_SIZE})
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList
}