/**
 * @description blog view 路由
 * @author
 */

const router = require('koa-router')()

const { genLoginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount,getAtMeBlogList } = require('../../controller/blog-at')

const { getFans, getFollowers } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')
const { ERR_OK } = require('../../conf/constant')

// 首页
router.get('/', genLoginRedirect(), async (ctx, next) => {
    const userInfo = ctx.session.userInfo

    // 获取第一页数据 controller
    const res = await getHomeBlogList(userInfo.id, 0)
    const { count: blogCount, blogList, isEmpty, pageIndex, pageSize } = res.data


    // 粉丝 controller
    const fansRes = await getFans(userInfo.id)
    const { count: fansCount, fansList } = fansRes.data


    // 关注了哪些微博主
    const followerRes = await getFollowers(userInfo.id)
    const { count: followersCount, followersList } = followerRes.data

    // @我的微博数
    const atMeRes = await getAtMeCount(userInfo.id)
    const { count: atCount } = atMeRes.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            count: blogCount,
            blogList,
            isEmpty,
            pageIndex,
            pageSize
        }
    })
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
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(profileUserName)
        if (existResult.errno === ERR_OK) {
            curUserInfo = existResult.data
        } else {
            // 用户名不存在
            return
        }
    }

    // 粉丝 controller
    const fansRes = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansRes.data

    // 是否关注了此人
    const amIFollowed = fansList.some(item => item.id === myUserInfo.id)

    // 关注了哪些微博主
    const followerRes = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followerRes.data

    // @我的微博数
    const atMeRes = await getAtMeCount(myUserInfo.id)
    const { count: atCount } = atMeRes.data

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
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed,
            atCount
        }
    })
})

// 广场页
router.get('/square', genLoginRedirect(), async (ctx, next) => {
    // 获取微博数据,第一页
    const res = await getSquareBlogList(0)
    const {
        blogList,
        pageSize,
        pageIndex,
        count,
        isEmpty
    } = res.data

    await ctx.render('square', {
        blogData: {
            blogList,
            pageSize,
            pageIndex,
            count,
            isEmpty
        }
    })

})

// atMe页
router.get('/at-me',genLoginRedirect(),async(ctx,next) => {
    const {id} = ctx.session.userInfo

    // 获取@数量
    const atMeRes = await getAtMeCount(id)
    const { count: atCount } = atMeRes.data

    // 获取第一页数据 controller
    const res = await getAtMeBlogList(id)
    const { count: blogCount, blogList, pageIndex, pageSize } = res.data

    await ctx.render('atMe', {
        atCount,        
        blogData: {
            count: blogCount,
            blogList,
            isEmpty:blogList.length === 0,
            pageIndex,
            pageSize
        }
    })

    // 标记已读
})

module.exports = router