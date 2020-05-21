/**
 * @description 用户数据模型
 * @author sswq
 */

const seq = require('../seq')
const {STRING,BOOLEAN,INTEGER,TEXT,DECIMAL} = require('../types')


// 创建 User 模型, 数据表名users
const User = seq.define('user', {
    // id 会自动创建,并设为主键,自增
    userName: {
        type: STRING, // varchar(255)
        allowNull: false,
        unique:true,
        comment:'用户名,唯一'
    }, 
    password: {
        type: STRING, // varchar(255)
        allowNull: false,
        comment:'密码'

    },
    nickName:{ 
        type: STRING,
        allowNull: false ,
        comment:'昵称'
    },
    gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue: 3,
        comment:'性别(1 男性 2 女性 3保密)'
    },
    picture:{
        type: STRING,
        comment:'头像, 图片地址'
    },
    city:{
        type: STRING,
        comment:'城市'
    }
})

module.exports = User