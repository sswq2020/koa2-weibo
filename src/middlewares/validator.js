/**
 * @description josn schema 验证中间件
 * @author sswq
 */


const { createErrorData } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * @description 验证的中间件
 * @param {Function} validatorFn 验证函数
 */
function genValidator(validatorFn){
    // 定义中间件函数
    async function validator(ctx,next){
        // 校验
        const data = ctx.request.body
        const err = validatorFn(data)
        if(err){
            ctx.body = createErrorData(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    return validator
}

module.exports = genValidator