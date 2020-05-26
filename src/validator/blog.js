/**
 * @description 微博 数据格式校验
 * @author sswq
 */

const validate = require('./_validator')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content:{
            type:'string'
        },
        image:{
            type:'string',
            maxLength:255
        }

    }
}

/**
 * @description 校验微博数据格式
 * @param {Object} data 用户数据
 */
function blogValidate(data={}){
    return validate(SCHEMA,data)
}

module.exports = blogValidate