/**
 * 拦截器 响应器
 */
import axios from 'axios';
import { message } from 'antd';
import global from './global';

//创建 axios 实例 react中创建 axios 实例跟 vue 中创建实例有所不同
axios.create({
    baseURL: global.requestUrl,   //api的base_url
    timeout: 5000,   //请求超时时间
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset = UTF-8',
        'Access-Control-Allow-Origin': '*'   //'NO Acesss-Control-Allow-Origin'
    }
});

// 注：Coontent-Type 只能以.post的方式配置，否则无效
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset = UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset = UTF-8';

//请求拦截器
axios.interceptors.request.use(config => {
    return config;
}, error => {
    message.error('请求失败！' + error);
});

//响应拦截器
axios.interceptors.response.use(data => {
    if (data.status == 200) {
        if (data.data.recode === 105) {
            console.log('请先登录！');
            window.location = '/login';
        } else if (data.data.recode == 103) {
            console.log('权限不足！');
        } else {
            console.log(data.data.remsg);
        }
        return data;
    } else {
        message.error(data.data.remsg);
    }
}, error => {
    if (error.response.status == 404 || error.response.status == 504) {
        console.log('服务器死妈了！');
    } else {
        console.log('未知错误！');
    }
});

export default axios;
