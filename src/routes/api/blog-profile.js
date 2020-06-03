/**
 * @description 个人主页 API路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow,unfollow } = require('../../controller/user-relation')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')



//加载更多
router.get('/loadMore/:userName/:pageIndex', genLoginCheck(), async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const res = await getProfileBlogList(userName, pageIndex)
    const { blogList } = res.data

    // 渲染为html字符串
    res.data.blogListTpl = getBlogListStr(blogList)
    delete res['data']['blogList']
    ctx.body = res

})

// 关注此人
router.post('/follow',genLoginCheck(),async (ctx,next)=>{
    const {userId:followerId} = ctx.request.body
    const {id:myUserId} = ctx.session.userInfo
    const res = await follow(followerId,myUserId)
    // controller
    ctx.body = res
})


// 取消关注此人
router.post('/unfollow',genLoginCheck(),async (ctx,next)=>{
    const {userId:followerId} = ctx.request.body
    const {id:myUserId} = ctx.session.userInfo
    const res = await unfollow(followerId,myUserId)
    // controller
    ctx.body = res
})

module.exports = router