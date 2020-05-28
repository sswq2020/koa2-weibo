/**
 * @description 个人主页 controller
 * @author sswq
 */

const {getBlogListByUser} = require('../services/blog')
const {PAGE_SIZE} = require('../conf/constant')
const { createSuccessData, createErrorData } = require('../model/ResModel')

/**
 * @description 获取个人主页微博列表 
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */ 
async function getProfileBlogList(userName,pageIndex = 0){
    const result = await getBlogListByUser({userName,pageIndex,pageSize:PAGE_SIZE})
    const {blogList,count} = result
    return createSuccessData({
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count,
        isEmpty:blogList.length === 0
    })
}


module.exports = {
    getProfileBlogList
}