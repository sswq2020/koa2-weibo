/**
 * @description 个人主页 API路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
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
module.exports = router