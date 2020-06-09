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

module.exports = {
    createAtRelation
}