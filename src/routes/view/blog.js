/**
 * @description blog view 路由
 * @author
 */

const router = require('koa-router')()

const { genLoginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const {ERR_OK} = require('../../conf/constant')

// 首页
router.get('/', genLoginRedirect(), async (ctx, next) => {
    await ctx.render('index', {})
})

// 假如用户自己输入地址,不加username,系统自动去跳转 
router.get('/profile', genLoginRedirect(), async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

// 个人主页
router.get('/profile/:userName', genLoginRedirect(), async (ctx, next) => {
    const profileUserName = ctx.params.userName
    const myUserInfo = ctx.session.userInfo
    const isMe = profileUserName === myUserInfo.userName
    let curUserInfo
    if(isMe){
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist
        if(existResult === ERR_OK){
            curUserInfo = existResult.data
        }else {
            // 用户名不存在
            return
        }
    }

    const res = await getProfileBlogList(profileUserName)
    const {
        blogList,
        pageSize,
        pageIndex,
        count,
        isEmpty
    } = res.data

    await ctx.render('profile', {
        blogData: {
            blogList,
            pageSize,
            pageIndex, 
            count,
            isEmpty
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router