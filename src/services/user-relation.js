/**
 * @description 用户关系 service
 * @author sswq
 */

const {User,UserRelation} = require('../db/model/index')
const {formatUser} = require('./_format')

/**
 * @description 根据被关注人的id获取被关注人的的粉丝列表
 * @param {number} followerId 被关注人的id
 */ 
async function getUserByFollower(followerId){
    const result = await User.findAndCountAll({
        attributes:['id','userName','nickName','picture'],
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:UserRelation,
                where:{
                    followerId
                }
            }
            
        ]
    })

    // result.count 总数
    // result.rows 查询结果 数组
    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    return {
        count:result.count,
        userList
    }
}

/**
 * @description 根据微博主id获取他关注了哪些微博主列表
 * @param {number} userId 微博主id
 */ 
async function getFollowerByUser(userId){
    const result = await UserRelation.findAndCountAll({
        attributes:['followerId'] ,
        where:{
            userId
        },
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes:['id','userName','nickName','picture'] ,
            }
        ]
    })

    // result.count 总数
    // result.rows 查询结果 数组
    let userRelationList = result.rows.map(row => row.dataValues).map(item=>{
        let user = item.user.dataValues
        item.user = formatUser(user)
        item = Object.assign({},item,{...item.user})
        return item
    })
    return {
        count:result.count,
        userList:userRelationList
    }
}


/**
 * @description 建立关注者和被关注者之间的关联
 * @param {number} followerId 准备关注的用户ID
 * @param {number} userId 用户ID
 */
async function addFollower(followerId,userId){
    let addFollowerData = {userId,followerId}
    const result = await UserRelation.create(addFollowerData)
    return result.dataValues
}

/**
 * @description 取消关注者和被关注者之间的关联
 * @param {number} followerId 被关注的用户ID
 * @param {number} myUserId 用户ID
 */
async function cancelFollower(followerId,userId){
    const result = await UserRelation.destroy({
        where:{
            userId,
            followerId
        }
    })
    // 返回删除的行数
    return result > 0 
}


module.exports = {
    getUserByFollower,
    getFollowerByUser,
    addFollower,
    cancelFollower
}