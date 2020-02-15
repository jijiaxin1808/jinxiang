import React, { useState, useEffect } from "react";
import "./index.less";
import * as API from "../../config/api";
import { Tabs, Divider, Form, Input, Icon, Button } from "antd";


const { TabPane } = Tabs;

const UserManage = (props)=> {

    const [data, setData] = useState();

    const handleSubmit = e => {
          e.preventDefault();
          props.form.validateFields((err, values) => {
            if (!err) {
            //   console.log('Received values of form: ', values);
            const params = {
                page:1,
                size:10,
                name:values.username
            }
            API.searchUsers(params)
            .then(res=> {
                if(res.data.code === 0) {
                    setData(res.data.data);
                }
            })
            }
          });
        }
    const { getFieldDecorator } = props.form
    return (
        <div>
            <div className = "title-text">用户管理</div>
            <p>对于一些有违规操作的用户，您可以对其进行操作，让其在一段时间内无法正常使用近享APP。</p>
            <Divider />
            <div className = "title-text">操作</div>
            <p>查找用户，然后对该用户进行操作。</p>
            <Form layout="inline" onSubmit={handleSubmit}>
              <Form.Item >
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    onChange = {()=>{setData()}}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                    查找
                </Button>
              </Form.Item>
            </Form>
                {data?<>{data.length?<div>有用户</div>:<div>搜索的用户不存在</div>}</>:<></>}
        </div>
    )
	
}
const WarppedUserManage = Form.create()(UserManage);

const BlcakList = ()=> {
    return (
        <div>黑名单</div>
    )
 
}

const Users = ()=> {

    return (
        <div>
            <div className = "title">用户管理</div>
            <Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
                <TabPane tab="用户管理" key="1">
                    <WarppedUserManage />
                </TabPane>
                <TabPane tab="黑名单" key="2">
                    <BlcakList />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Users;