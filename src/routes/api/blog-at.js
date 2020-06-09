/**
 * @description atMe页 API 路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListStr } = require('../../utils/blog')


router.prefix('/api/atMe')


// atMe页加载更多微博
router.get('/loadMore/:pageIndex',genLoginCheck(),async (ctx,next) => {
    let { pageIndex } = ctx.params
    const {id} = ctx.session.userInfo
    const res = await getAtMeBlogList(id,parseInt(pageIndex))   
    const { blogList } = res.data
    // 渲染为html字符串
    res.data.blogListTpl = getBlogListStr(blogList,true)
    ctx.body = res
})

module.exports = router