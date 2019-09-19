/**
 * 用户接口-登录 修改密码等
 */

import request from '../config/request';
import qs from 'qs';

//登录
export async function getLogin(params) {
    return request({
        method: 'post',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset = UTF-8'
        },
        url: '/api/admin/user/login',
        data: qs.stringify(params)
    });
}

