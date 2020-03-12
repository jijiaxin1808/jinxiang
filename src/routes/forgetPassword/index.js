import React, { useState, useEffect } from "react";
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, message } from "antd";
import  Reg from "../../utils/reg";
import * as API from "../../config/api";

const FpassWord = (props)=> {
    const { getFieldDecorator, validateFields } = props.form
    const [ validating, setValidatIng ] = useState(false)
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
        validateFields(["userphone"],(err, value)=> {
            if(value.userphone) {
                API.sendUsersSms({phone:value.userphone})
                .then(res=> {
                    if(res.data.code === 0) {
                        setValidatIng(true)
                    }
                })
            }
            else message.error("请输入手机号")
        })
    }
    const handleOk = ()=> {
        validateFields((err, value)=> {
            
        })
    }



    return <>
          <div className = "loginForm">
  <div>
  <div className = "login-div">
    <p className = "login-title">近享后台系统</p>
    <Form  className="login-form">
      <Form.Item>
        {getFieldDecorator('userphone', {
          rules: [{ required: true, message: '请输入注册的手机号' },{pattern:Reg.mobile, message:"请输入正确的手机号"}],
        })(
          <Input
            prefix={<LegacyIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="手机号"
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('validate', {
          rules: [{ required: true, message: '请输入收到的验证码' }],
        })(
        <>
        <Input
        prefix={<LegacyIcon type="flag" />}
        style = {{width:120,display: "inline-block",marginRight: 20}}
        placeholder="验证码"
        /> 
        <Button type ="primary" style = {{width: 60,display: "inline-block"}} disabled = {validating}
        onClick = {()=>handleValidate()}>{validating?time:"获取"}</Button>
        </>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('newPassword', {
          rules: [{ required: true, message: '请输入新密码' }],
        })(
        <Input
        prefix={<LegacyIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="新密码"
        type = "password"
        /> 
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('ok', {
        })(
            <Button onClick = {handleOk} type = "primary">完成 去登录</Button>
        )}
      </Form.Item>
    </Form>
    <div className = "warn">修改密码接口逻辑有问题</div>
  </div>
  </div>
  </div>
  </>;

}
export default Form.create()(FpassWord);