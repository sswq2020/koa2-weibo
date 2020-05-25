/**
 * @description utils API
 * @author sswq
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { genLoginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')


// 上传图片
router.post('/upload', genLoginCheck(), koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file'] // ['file']对应前端 new FormData().append(key,value)中的key;
    const { size, path, name, type } = file
    // controller
    ctx.body = await saveFile({
        size,
        filePath: path,
        name,
        type
    })
})

module.exports = router   