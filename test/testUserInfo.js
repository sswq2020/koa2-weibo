/**
 * @description 单元测试的用户信息
 * @author sswq
 */

/**
 * 【特别提醒】cookie 是用户的敏感信息，此处只能是**测试**用户的 cookie
 * 每次测试用户重新登录，都需要更新这里的 cookie
 */
const S_COOKIE = 'weibo.sid=RjUybioYBm6bUHs8eI4MBmw9w8n2jRYc; weibo.sid.sig=VQowBXj4KZBU_fWE32jgnhVhuu8'

const V_COOKIE = 'weibo.sid=jcSEvv5hGWv5N5Qbf6AXKRkRQqjGX-K1; weibo.sid.sig=cOxDg_gggGecZEoCpvzDTBebtNw'

module.exports = {
    S_ID:1,
    S_COOKIE,
    S_USER_NAME:'sswq',

    V_ID:2,
    V_COOKIE,
    V_USER_NAME:'vivo'    

}