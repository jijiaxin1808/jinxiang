import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, message } from 'antd';
import React, {useState} from "react";
import "./index.less";
import * as API from "../../config/api";
import { Link } from "dva/router";

const Login = (props)=> {
	const [loading, setLoading] = useState(false);
    const handleSubmit =  e => {
    //     e.preventDefault();
    //     props.form.validateFields( async (err, values) => {
    //     if (!err) {
		// 	const data = {
		// 		phone: values.username,
		// 		pwd: values.password
		// 	}
		// 	setLoading(true);
		// 	await API.loginByPwd(data)
		// 	.then( async res=> {
		// 		if(res.data.code === 0) {
    //       localStorage.setItem("token",res.data.data.token)
    //       localStorage.setItem("schoolId",res.data.data.user.schoolId);
		// 			await message.success("登录成功");
		// 			props.history.push("/manage");
		// 		}
		// 	})
		// 	setLoading(false);
		// }
    // });    
    localStorage.setItem("schoolId",1);
    localStorage.setItem("token","token");
    localStorage.setItem("level",true);
    props.history.push("/manage");
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
                prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入你的密码' }],
            })(
              <Input
                prefix={<LegacyIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Link to = "/Fpassword">忘记密码</Link>
          <Form.Item className = "flex-center" >
            <Button type="primary" htmlType="submit" className="login-form-button" loading = {loading}>
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