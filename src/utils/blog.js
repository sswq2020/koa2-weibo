/**
 * @description 微博数据相关的工具方法
 * @author sswq
 */


const fs = require('fs') 
const path = require('path')
const ejs = require('ejs')

/***获取blog-list.ejs的文件内容**/ 
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname,'..','views','widgets','blog-list.ejs')
).toString()



/**
 * @description 根据blogList 渲染出 html字符串
 * @param {Array} blogList 
 * @param {Boolean} canReply 
 */
function getBlogListStr(blogList = [],canReply = false){
    return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
    })
}


module.exports = {
    getBlogListStr
}