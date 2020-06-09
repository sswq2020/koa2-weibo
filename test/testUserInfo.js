/**
 * @description 单元测试的用户信息
 * @author sswq
 */

/**
 * 【特别提醒】cookie 是用户的敏感信息，此处只能是**测试**用户的 cookie
 * 每次测试用户重新登录，都需要更新这里的 cookie
 */
const S_COOKIE = 'weibo.sid=uLoAvXLquqvlqnJRTFPQTMNELykww7b2; weibo.sid.sig=HW-6TF1UhZxGqNhuvuoSHHamU0s'

const V_COOKIE = 'weibo.sid=8l9nlfMolT7w1IaFBk9Fp7d2JH7c0nha; weibo.sid.sig=GushGx5xC8W1oXvD9TTFn8zwYB4'

module.exports = {
    S_ID:1,
    S_COOKIE,
    S_USER_NAME:'sswq',

    V_ID:2,
    V_COOKIE,
    V_USER_NAME:'vivo'    

}