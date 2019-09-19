/**
 * 首页
 */

//react
import React, { Component } from 'react';
//connect
import { connect } from 'dva';
//路由
import { Link } from 'dva/router';

//路由
const loginPath = '/login';

//model中方法
const list = 'home/list';


@connect(state => ({
    home: state.home
}))
class Home extends Component {

    state = {}

    componentDidMount() {
        this.props.dispatch({
            type: list,
            payload: {
                currentPage: 1,
                pageSize: 10
            }
        });
    }

    render() {
        return (
            <div>
                <div>Hello word！</div>
                <Link to = {{ pathname: loginPath }}>登录</Link>
            </div>
        )
    }

}

export default Home


