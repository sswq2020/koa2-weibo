/**
 * @description blog service 
 * @author sswq
 */

const { Blog,User } = require('../db/model/index')
const {formatUser,formatBlog} = require('./_format')

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

/**
 * @description 根据用户获取微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页数量
 */
async function getBlogListByUser({userName,pageIndex = 0,pageSize = 10}){
    //拼接查询条件
    let userwhereOpts = {}
    if(userName){
        userwhereOpts.userName = userName
    }
    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageIndex * pageSize, // 跳过多少条
        order:[
            ['id','desc'] // 排序的规则根据微博,倒序排列
        ],
        include:[
            {
                model:User,
                attributes:['userName','nickName','picture'] ,
                where: userwhereOpts
            }
        ]
    })

    // result.count 总数,与分页无关
    // result.rows 查询结果,数组

    let blogList = result.rows.map(row => row.dataValues).map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    blogList = formatBlog(blogList)

    return {
        count:result.count,
        blogList
    }

}

module.exports = {
    createBlog,
    getBlogListByUser
} 