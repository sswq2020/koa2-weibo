/**
 * @description util controller
 * @author sswq
 */

const path = require('path')
const fse = require('fs-extra')
const { createSuccessData, createErrorData } = require('../model/ResModel')
const { uploadFileSizeFailInfo,
} = require('../model/ErrorInfo')



/***存储目录**/
// https://www.cnblogs.com/web-record/p/9907680.html
// path.join(__dirname)就是当前controller目录下
// path.join(__dirname,'..')就是当前controller目录上一级,就是src目录下
// path.join(__dirname,'..','..')就是当前controller目录上一级,就是koa2-weibo目录下
// path.join(__dirname,'..','..',‘uploadFiles’)就是当前controller目录上一级,就是koa2-weibo目录下uploadFiles与src平级
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')


// 是否需要创建目录,只执行一次
fse.pathExists(DIST_FOLDER_PATH).then(exit =>{
    if(!exit){
        fse.ensureDir(DIST_FOLDER_PATH) 
    }
})



/***文件最大体积3M**/
const MIX_SIZE = 1024 * 1024 * 1024 * 3

/**
  * @description 保存文件
  * @param {number} size 文件提交大小
  * @param {string} name 文件名 
  * @param {string} type 文件类型
  * @param {string} filePath 文件路径 
  */
async function saveFile({ size, name, type, filePath }) {
    if (size > MIX_SIZE) {
        // 这里为什么要删除呢,因为经过路由层koaForm()中间件,在服务器中已经写入图片文件,这里不需要,当然要删除
        await fse.remove(filePath)
        return createErrorData(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = Date.now() + '.' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    // 返回信息
    return createSuccessData({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}