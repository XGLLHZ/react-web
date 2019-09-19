/**
 * 首页接口
 */

import request from '../config/request';

//首页数据
export function getList(params) {
    return request.post('/api/admin/user/list', params);
}


