/**
 * @description json schema 校验
 * @author sswq
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors:true 输出所有的错误,比较慢
})


/**
 * 
 * @param {Object} schema josn schema的规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate