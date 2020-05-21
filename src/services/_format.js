/**
 * @description 数据格式化
 * @author sswq
 */


const {DEFAULT_PICTURE} = require('../conf/constant')


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
 * @description 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list){
    if(list === null) {
        return list
    }

    if(Array.isArray(list)){
        return list.map(_formatPicture)
    }

    return _formatPicture(list)

}

module.exports = {
    formatUser
}

