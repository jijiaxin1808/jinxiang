import React, { useState, useEffect } from "react";
import { Input, Button, message, Form } from "antd";
import  Reg from "../../utils/reg";
import * as API from "../../config/api";

const FpassWord = (props)=> {
    const [ validating, setValidatIng ] = useState(false);
    const [ form ] = Form.useForm();

    const [ time, setTime ] = useState(60);
    useEffect(()=> {
        if(validating) {
            let Timer1 = setTimeout(()=> {setTime(time-1)},1000)
            if(time === 0) {
                clearTimeout(Timer1);
                setValidatIng(false);
                setTime(60);
            }
        }
    },[validating, time])
			
    const handleValidate = ()=> {
		form.validateFields(["userphone"])
		.then(values => {
			API.sendUsersSms({phone:values.userphone})
			.then(res=> {
				if(res.data.code === 0) {
					setValidatIng(true)
				}
			})
		})
		.catch(err => message.error("请输入手机号"))
	}
	
    const handleOk = ()=> {
		form.validateFields()
		.then(values => {
			const Qdata = {
				smsCode: values.validate,
				newPwd: values.newPassword
			}
			API.updatePwd(Qdata).then(res => {
				if(res.data.code === 0) {
					props.history.push("/login");
				}
			})
		})
	}

	return <>
        <div className = "loginForm">
		<div>
		<div className = "login-div">
			<p className = "login-title">近享后台系统</p>
			<Form  className="login-form" form = { form }>
				<Form.Item name = "userphone"
				rules = {[{ required: true, message: '请输入注册的手机号' },
				{pattern:Reg.mobile, message:"请输入正确的手机号"}]}>
					<Input
						placeholder="手机号"
					/>
				</Form.Item>

				<Form.Item style = {{height: 20}}>
					<Form.Item name = "validate" style = {{display: "inline-block"}}
					rules = {[{ required: true, message: ' ' },
					]}>
							<Input
							style = {{width:80,display: "inline-block",marginRight: 20}}
							placeholder="验证码"
							/> 
					</Form.Item>
					<Button type ="primary" style = {{width: 100,display: "inline-block",float:"right"}} disabled = {validating}
					onClick = {()=>handleValidate()}>{validating?`${time}s后获取`:"获取验证码"}</Button>	
				</Form.Item>
				<Form.Item name = "newPassword"
				rules = {[{ required: true, message: '请输入新密码' }]}>
					<Input
					placeholder="新密码"
					type = "password"
					/> 
				</Form.Item>
				<Form.Item name = "ok">
						<Button onClick = {handleOk} type = "primary">完成 去登录</Button>
				</Form.Item>
			</Form>
		</div>
		</div>
		</div>
  </>;
}
export default FpassWord;