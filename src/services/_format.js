/**
 * @description 数据格式化
 * @author sswq
 */

const {DEFAULT_PICTURE,REG_FOR_AT_WHO} = require('../conf/constant')
const {timeFormat} = require('../utils/dt')
/**
  * @description 用户默认头像
  * @param {Object} obj 
  */
function _formatPicture(obj){
    if(obj.picture === null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj){
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatConent(obj){
    obj.contentFormat = obj.content
    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,(match,nickName,userName)=>{
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    return obj
}

/**
 * @description 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list){
    if(list === null) {
        return list
    }

    if(Array.isArray(list)){
        return list.map(_formatDBTime)
    }

    return _formatPicture(list)
}

/**
 * @description 格式化博客
 * @param { Array | Object} list 博客列表或者单个博客对象
 */
function formatBlog(list){
    if(list === null) {
        return list
    }
    if(Array.isArray(list)){
        return list.map(_formatDBTime).map(_formatConent)
    }
    list = _formatDBTime(list)
    list = _formatConent(list)
    return list
}

module.exports = {
    formatUser,
    formatBlog
}

