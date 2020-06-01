/**
 * @description 广场页 API路由
 * @author sswq
 */

const router = require('koa-router')()
const { genLoginCheck } = require('../../middlewares/loginChecks')
const {getSquareBlogList} =require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

//加载更多
router.get('/loadMore/:pageIndex', genLoginCheck(), async (ctx, next) => {
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const res = await getSquareBlogList(pageIndex)

    //渲染模板
    res.data.blogListTpl= getBlogListStr(res.data.blogList)

    ctx.body = res
})
module.exports = router