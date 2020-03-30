import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Tabs, Divider, Cascader } from "antd";

const { TabPane } = Tabs;
const Push = (props)=> {
    const {getFieldDecorator} = props.form
    return (
        <div>
            <div className = "title">推送</div>
            <Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
                <TabPane tab="发送推送" key="1">
                    <div className = "title-text">发送推送</div>
                    <p>选择某个官方账号，对部分或者全部用户发送推送。用户将会在“消息”中看见您的推送。</p>
                    <Divider />
                    <div className = "title-text">操作</div>
                    return (
      <Form layout="inline" >
        <Form.Item  >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Cascader  placeholder="请选择账号" />
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Cascader  placeholder= "请选择推送对象" />
          )}
        </Form.Item>
      </Form>
      <p>编辑推送对象</p>
                </TabPane>
                <TabPane tab="管理账号" key="2">
                    <div>管理账号</div>
                </TabPane>
                <TabPane tab="推送历史" key="3">
                    <div>推送历史</div>
                </TabPane>
                
            </Tabs>
        </div>
    )
}
export default Form.create()(Push);