/**
 * @deprecated 微博 @ 用户关系 service
 * @author sswq
 */

const { Blog, AtRelation,User } = require('../db/model/index')
const {formatUser,formatBlog} = require('./_format')

/**
 * @description  创建微博 @ 用户关系表
 * @param {number} blogId 博客 ID
 * @param {number} userId 用户ID
 */
async function createAtRelation(blogId,userId) {
    const result = await AtRelation.create({
        blogId,userId
    })
    return result.dataValues
}

/**
 * @description 根据userId获取对应的@user的数量(未读的)
 * @param {number} userId 
 */
async function getAtRelationCount (userId){
    const result = await AtRelation.findAndCountAll({
        attributes:['blogId','userId'],
        where:{
            userId,
            isRead:false 
        },
        order:[
            ['id','desc']
        ]
    })
    return {
        count:result.count
    }

}

/**
 * @description 根据userId,分页获取 @ me的微博列表,又是三表联查
 * @param {number} userId  用户Id
 * @param {number} pageIndex 分页
 * @param {number} pageSize 分页大小
 */
async function  getAtUserBlogList(userId, pageIndex = 0,pageSize = 10){
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageIndex * pageSize, // 跳过多少条
        order:[
            ['id','desc']
        ],
        include:[ 
            {
                // User也要查,不然不知道谁@我
                model:User, 
                attributes:['userName','nickName','picture']
            },
            {
                model:AtRelation,
                attributes:['blogId'],
                where:{
                    userId,
                    // isRead:false 把所以at的都显示
                }
            }
        ]
    })

    // result.rows
    // result.count
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList).map(item => {
        item.user = formatUser(item.user.dataValues)
        return item
    })

    return {
        count:result.count,
        blogList
    }

}

/**
 * @description 更新AtRealation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation(
    { newIsRead }, // 要更新的内容
    {userId,isRead} // 条件
){
    let updateData = {}
    if(newIsRead){
        updateData.isRead = newIsRead
    }

    let whereOpt = {}
    if(userId){
        whereOpt.userId = userId
    }
    if(isRead === false){
        whereOpt.isRead = isRead
    }
    const result = await AtRelation.update(updateData,{
        where:whereOpt
    })

    return result[0] > 0
}



module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}