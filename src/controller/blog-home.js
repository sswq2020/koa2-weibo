/**
 * @description blog controller
 * @author sswq
 */

const xss = require('xss')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const { getUserInfo } = require('../services/user')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { createAtRelation } = require('../services/at-relation')

const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../conf/constant')
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

    // 分析并收集content 中的@用户
    // content 格式如"hello @vivo - vivo 你好 @苹果 - apple"
    const atUserNameList = []
    content = content.replace(REG_FOR_AT_WHO,(matchstr,$1,$2)=>{
        // 目的不是replace,而是获取userName,也就是$2
        atUserNameList.push ($2)
        return matchstr  // 替换不生效,符合预期 
    })

    // 根据@用户名查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(async (userName)=> await getUserInfo(userName))
    )

    /***根据用户信息,获取用户id**/ 
    const atUserIdList =  atUserList.map(user =>user.id)

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

        //
        await Promise.all(atUserIdList.map(
            async(userId) => createAtRelation(blog.id,userId)
        ))

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