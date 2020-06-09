/**
 * @description 微博@ 用户的关系的, 数据模型
 * @author sswq
 */

const seq = require('../seq')
const {STRING,BOOLEAN,INTEGER,TEXT,DECIMAL} = require('../types')

// 创建 AtRelation模型,数据表名atrelation
const AtRelation = seq.define('atrelation',{
    // id 会自动创建,并设为主键,自增
    userId:{
        type:INTEGER,
        allowNull: false,
        comment:'用户 ID'
    },
    blogId:{
        type:INTEGER,
        allowNull: false,
        comment:'微博 ID'
    },
    isRead:{
        type:BOOLEAN,
        allowNull:false,
        defaultValue:false, // 默认未读
        comment:'是否已读'
    }        
})

module.exports = AtRelation
