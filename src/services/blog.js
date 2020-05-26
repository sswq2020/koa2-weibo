/**
 * @description blog service 
 * @author sswq
 */

const { Blog } = require('../db/model/index')

/**
 * @description  创建微博
 * @param {string} userId 用户 ID
 * @param {string} content 微博内容
 * @param {string} image 微博图片地址
 */
async function createBlog({ userId, content, image}) {
    let createBlogData = {userId,content}
    if(image){
        debugger
        createBlogData.image = image
    }
    const result = await Blog.create(createBlogData)

    return result.dataValues
}


module.exports = {
    createBlog
}