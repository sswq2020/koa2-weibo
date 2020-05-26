/**
 * @description blog controller
 * @author sswq
 */

const { createSuccessData, createErrorData } = require('../model/ResModel')
const { getUserInfo} = require('../services/user')
const { createBlog} = require('../services/blog')
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
async function releaseBlog(ctx,{content, image}) {
    const {id,userName} = ctx.session.userInfo
    const userInfo = await getUserInfo(userName)
    if (!userInfo) {
        return createErrorData(registerUserNameNotExitInfo)
    }
    // 注册service
    try {
        await createBlog(
            {
                content,
                userId:id,
                image
            })
        return createSuccessData()
    } catch (ex) {
        console.log(ex.message, ex.stack)
        return createErrorData(createBlogFailInfo)
    }
}

module.exports ={
    releaseBlog
}