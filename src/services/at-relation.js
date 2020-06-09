/**
 * @deprecated 微博 @ 用户关系 service
 * @author sswq
 */

const { AtRelation } = require('../db/model/index')

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

module.exports = {
    createAtRelation,
    getAtRelationCount
}