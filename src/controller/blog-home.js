/**
 * @description blog controller
 * @author sswq
 */

const xss = require('xss')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const { getUserInfo } = require('../services/user')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const {
    registerUserNameNotExitInfo,
    createBlogFailInfo,
} = require('../model/ErrorInfo')

/**
  * @description 发布微博
  * @param {string} content
  * @param {string} image 
  * @param {Object} ctx 
  */
async function releaseBlog(ctx, { content, image }) {
    const { id, userName } = ctx.session.userInfo
    const userInfo = await getUserInfo(userName)
    if (!userInfo) {
        return createErrorData(registerUserNameNotExitInfo)
    }
    // 注册service
    try {
        const blog = await createBlog(
            {
                content: xss(content),
                userId: id,
                image
            })
        return createSuccessData(blog)
    } catch (ex) {
        console.log(ex.message, ex.stack)
        return createErrorData(createBlogFailInfo)
    }
}

/**
 * @description 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    // service
    const { count, blogList } = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
    return createSuccessData(
        {
            isEmpty: blogList.length === 0,
            count,
            blogList,
            pageIndex,
            pageSize: PAGE_SIZE
        })
}

module.exports = {
    releaseBlog,
    getHomeBlogList
}