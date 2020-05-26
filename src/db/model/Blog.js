/**
 * @description 微博数据模型
 * @author sswq
 */


const seq = require('../seq')
const {STRING,BOOLEAN,INTEGER,TEXT,DECIMAL} = require('../types')


// 创建 Blog 模型, 数据表名blogs
const Blog = seq.define('blog', {
    // id 会自动创建,并设为主键,自增
    userId: {
        type: INTEGER,
        allowNull: false,
        comment:'用户 ID'
    }, 
    content: {
        type: TEXT,
        allowNull: false,
        comment:'微博内容'
    },
    image:{
        type: STRING,
        comment:'图片地址'
    }
})

module.exports = Blog