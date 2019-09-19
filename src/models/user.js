/**
 * 用户model
 */

import { getLogin } from '../services/user';
import { message } from 'antd';

export default {
    namespace: 'user',

    //页面数据
    state: {
        id: 0,
        username: '',
        password: ''
    },

    //请求方法
    effects: {
        //login
        *login({ payload }, { call, put }) {
            //开启加载中
            yield put({
                type: 'changeLoading',
                payload: true
            });
            const data = yield call(getLogin, payload);
            yield put({
                type: 'changeLoading',
                payload: false
            });
            if (data.data.recode == 200) {
                return;
            } else {
                message.error(data.data.remsg);
            }
        }
    },

    //数据处理
    reducers: {
        //保存数据
        save(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },

        // loading 状态
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload
            }
        },

        //清除 model 数据
        clear(satte) {
            return {
                ...satte,
                ...{
                    id: 0,
                    username: '',
                    password: ''
                }
            }
        }
    }

}

