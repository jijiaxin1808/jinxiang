import React, { useState } from "react";
import "./index.less";
import * as API from "../../config/api";
import { Tabs, Divider, Form, Input, Icon, Button, Table, Tag } from "antd";


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

    const columns = [
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key'
        },
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '封禁期限',
          key: 'date',
          dataIndex: 'date',
        },
        {
          title: '操作',
          key: 'handle',
          dataIndex: 'key',
          render: text => <Button onClick = {()=>{cancel(text)}}>解除</Button>
        },
    ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          phone: 32,
          date: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          phone: 42,
          date: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          phone: 32,
          date: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
    ];
    const cancel = (id)=> {

    }
    

    return (
        <div>
            <div className = "title-text">黑名单</div>
            <Table columns = {columns} dataSource = {data} />
        </div>
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