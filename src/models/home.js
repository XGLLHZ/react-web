/**
 * 首页model
 */

import { getList } from '../services/home';

export default {
    namespace: 'home',

    //页面数据
    state: {
        id: 0,
        currentPage: 1,
        pageSzie: 10,
        total: 0,
        dataList: []
    },

    //请求方法
    effects: {
        //list
        *list({ payload }, { call, put }) {
            //开启加载中
            yield put({
                type: 'changeLoading',
                payload: true
            });
            const data = yield call(getList, payload);
            if (data.data.recode == 200) {
                return;
            }
            //数据存储
            yield put({
                type: 'save',
                payload: {
                    dataList: data.data.body.dataList,
                    total: data.data.body.total
                }
            });
            //关闭加载中
            yield put({
                type: 'changeLoading',
                payload: false
            });
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
                    currentPage: 1,
                    pageSzie: 10,
                    total: 0,
                    dataList: []
                }
            }
        }
    }
}

