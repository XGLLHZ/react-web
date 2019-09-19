/**
 * 登录页
 */

//react
import React, { Component } from 'react';
//connect
import { connect } from 'dva';
//组件
import { Form, Input, Button } from 'antd';
//样式
import styles from './login.less'

//model中方法路径
const login = 'user/login';
const save = 'user/save';


@connect(state => ({
    user: state.user
}))
class Login extends Component {

    state = {}

    componentDidMount() {
        console.log('登录页！');
    }

    //input值变化时
    onInputChange(e) {
        let key = e.target.name;
        let value = e.target.value;
        let t = {};
        t[key] = value;
        this.props.dispatch({
            type: save,
            payload: t
        });
    }

    //点击登录按钮时
    onLoginClick() {
        const { user: { username, password } } = this.props;
        console.log(username + password);
        this.props.dispatch({
            type: login,
            payload: {
                username: username,
                password: password
            }
        });
    }

    render() {
        return (
            <div className = { styles.bg }>
                <div className = { styles.loginb }>
                    <div className = { styles.b1 }>管理员登录</div>
                    <Input className = { styles.b2 } placeholder = '请输入用户名'
                        name = 'username'
                        onChange = { this.onInputChange.bind(this) }></Input>
                    <Input className = { styles.b3 } placeholder = '请输入密码'
                        name = 'password'
                        onChange = { this.onInputChange.bind(this) }></Input>
                    <Button className = { styles.b4 } type = 'primary'
                        onClick = { this.onLoginClick.bind(this) }>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                </div>
            </div>
        );
    }

}

export default Login

