/**
 * @description blog view 路由
 * @author
 */

const router = require('koa-router')()

const { genLoginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')

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
    debugger
    const profileUserName = ctx.params.userName
    const userInfo = ctx.session.userInfo
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
            userInfo,
            isMe: profileUserName === userInfo.userName
        }
    })
})

module.exports = router