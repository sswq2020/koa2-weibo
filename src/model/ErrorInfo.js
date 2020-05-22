/**
 * @description 失败信息集合,包括 errno 和 message
 * @author sswq
 */


/***用户名已存在**/
const registerUserNameExistInfo = {
    errno:10001,
    message:'用户名已存在'
}

/***注册失败**/
const registerFailInfo = {
    errno:10002,
    message:'注册失败,请重试'
}

/***用户名不存在**/
const registerUserNameNotExitInfo = {
    errno:10003,
    message:'用户名未存在'
}

/***登录失败**/
const loginFailInfo = {
    errno:10004,
    message:'登录失败,用户名或密码错误'
}

/***未登录**/
const loginCheckFailInfo = {
    errno:10005,
    message:'您尚未登录'
}


/***修改密码失败**/
const changePasswordFailInfo = {
    errno:10006,
    message:'修改密码失败,请重试'
}


/***上传文件过大**/
const uploadFileSizeFailInfo = {
    errno:10007,
    message:'上传文件尺寸过大'
}

/***修改基本信息失败**/
const changeInfoFailInfo = {
    errno:10008,
    message:'您尚未登录'
}

/***json schema 校验失败**/
const jsonSchemaFileInfo = {
    errno:10009,
    message:'数据格式校验错误'
}
/***删除用户失败**/
const deleteUserFailInfo = {
    errno: 10010,
    message: '删除用户失败'
}
/***添加关注失败**/
const addFollowerFailInfo= {
    errno: 10011,
    message: '添加关注失败'
}

/***取消关注失败**/
const deleteFollowerFailInfo= {
    errno: 10012,
    message: '取消关注失败'
}

/***创建微博失败**/
const createBlogFailInfo = {
    errno: 11001,
    message: '创建微博失败，请重试'
}

/***删除微博失败**/
const deleteBlogFailInfo = {
    errno: 11002,
    message: '删除微博失败，请重试'
}

module.exports = {
    registerUserNameExistInfo,
    registerFailInfo,
    registerUserNameNotExitInfo,
    loginFailInfo,
    loginCheckFailInfo,
    changePasswordFailInfo,
    uploadFileSizeFailInfo,
    changeInfoFailInfo,
    jsonSchemaFileInfo,
    deleteUserFailInfo,
    addFollowerFailInfo,
    deleteFollowerFailInfo,
    createBlogFailInfo,
    deleteBlogFailInfo
}