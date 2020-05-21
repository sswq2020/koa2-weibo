/**
 * @description res 数据模型
 * @author sswq
 */

/**
  * 基础模块
  */
class BaseModel {
    constructor({errno,data,message}){
        this.errno = errno
        if(data){
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data={}){
        super({
            errno:0,
            data
        })
    }
}

class ErrorModel extends BaseModel{
    constructor({errno,message}){
        super({
            errno,
            message
        })
    }
}

function createSuccessData(data){
    let instance = new SuccessModel(data)
    return instance
}

function createErrorData({errno,message}){
    let instance = new ErrorModel({errno,message})
    return instance
}




module.exports = {
    SuccessModel,
    ErrorModel,
    createSuccessData,
    createErrorData
}