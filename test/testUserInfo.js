/**
 * @description 单元测试的用户信息
 * @author sswq
 */

/**
 * 【特别提醒】cookie 是用户的敏感信息，此处只能是**测试**用户的 cookie
 * 每次测试用户重新登录，都需要更新这里的 cookie
 */
const S_COOKIE = 'weibo.sid=NkmdpD2PsEF-sIHL4DgUeJUJVWJGi4WN; weibo.sid.sig=dh8bNVky3kYLF7upw2-19u6Mthk'

const V_COOKIE = 'weibo.sid=3SMJT_n2P5tmXw7PBX1YjSS1py_wS9b8; weibo.sid.sig=RVJmtjyJUDjoRGXFs9CvabVspso'

module.exports = {
    S_ID:1,
    S_COOKIE,
    S_USER_NAME:'sswq',

    V_ID:2,
    V_COOKIE,
    V_USER_NAME:'vivo'    

}