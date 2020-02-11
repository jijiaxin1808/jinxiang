import { Form, Icon, Input, Button } from 'antd';
import React from "react";
import "./index.less";

const Login = (props)=> {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };

    const { getFieldDecorator } = props.form;

    return (
      <div className = "loginForm">
      <div>
      <div className = "login-div">
        <p className = "login-title">近享后台系统</p>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入你的用户名' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入你的密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item className = "flex-center" >
            <Button type="primary" htmlType="submit" className="login-form-button margin-center">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
      </div>
    );
  
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;