/**
 * @description 广场页 controller
 * @author sswq
 */

const {PAGE_SIZE} = require('../conf/constant')
const { createSuccessData } = require('../model/ResModel')
const {getSquareCacheList} = require('../cache/blog')

/**
 * @description 获取广场主页微博列表 
 * @param {number} pageIndex 当前页面
 */ 
async function getSquareBlogList(pageIndex = 0){
    // cache
    const result = await getSquareCacheList(pageIndex,PAGE_SIZE)
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
    getSquareBlogList
}