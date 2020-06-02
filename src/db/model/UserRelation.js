/**
 * @description 用户关注关系
 * @author sswq
 */

const seq = require('../seq')
const {STRING,BOOLEAN,INTEGER,TEXT,DECIMAL} = require('../types')

const UserRelation = seq.define('userRelation',{
    // id 会自动创建,并设为主键,自增
    userId: {
        type: INTEGER,
        allowNull: false,
        comment:'用户 ID'
    }, 
    followerId:{
        type: INTEGER,
        allowNull: false,
        comment:'被关注用户的 ID'        
    }

})

module.exports = UserRelation