import React, { useState, useEffect } from "react";
import "./index.less";
import * as API from "../../config/api";
import { Tabs, Divider, Form, Input, Icon, Button, Table, Modal, Radio, message, Popconfirm } from "antd";
import emmiter from "../../utils/events";

const { TabPane } = Tabs;

const UserManage = (props)=> {

    const [data, setData] = useState();
	const [blockModelLoading, setBlockModelLoading] = useState(false);
	const [blockVisibly, setBlockVisibly] = useState(false);
	const [blockTime, setBlockTime] = useState(0);
	const [blockId, setBlockid] = useState();

    const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
		if (!err) {
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

	const apply = async (id)=> {
		const newdata = {
			userId: id,
			blockDays: 0
		}

		await API.blockUser(newdata)
		.then(res=> {
			if(res.data.code === 0) {
				message.success("永久封禁成功")
			}
		})
	}


	const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '封禁',
          key: 'block',
          dataIndex: 'id',
          render: text => <Button onClick = {()=> {setBlockVisibly(true); setBlockid(text)  }}>封禁</Button>
		},
		{
			title: '申请',
			key: 'apply',
			dataIndex: 'id',
			render: text => 
			<Popconfirm
			title="确定永久封禁当前用户?"
			onConfirm={()=> {apply(text)}}
			onCancel={()=>{}}
			okText= "确认"
			cancelText="取消"
			>
				<Button>申请</Button>
			</Popconfirm>
		},
    ];
    const handleBlockOk =async ()=> {
		setBlockModelLoading(true);

		const newdata = {
			userId: blockId,
			blockDays: blockTime
		}

		await API.blockUser(newdata)
		.then(res=> {
			if(res.data.code === 0) {
				emmiter.emit("handleUsers")
			}
		})

		setBlockVisibly(false);
		setBlockModelLoading(false);
		setBlockid();
    }
    const handleBlockCancel = ()=> {
		setBlockVisibly(false);
		setBlockid();
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
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                    查找
                </Button>
              </Form.Item>
            </Form>
				<Modal
					title="请选择封禁时长"
					visible={blockVisibly}
					confirmLoading={blockModelLoading}
					onOk={handleBlockOk}
					onCancel={handleBlockCancel}
					className = "openPage-modal"
					okText = "确认"
					cancelText = "取消"
				>
				 <Radio.Group defaultValue={3} size="large" onChange = {(value)=>{setBlockTime(value); message.success(value)}}>
					<Radio.Button value={3}>3天</Radio.Button>
					<Radio.Button value={7}>7天</Radio.Button>
					<Radio.Button value={30}>30天</Radio.Button>
				</Radio.Group>
				</Modal>
                {data?<>{data.length?<Table columns = {columns} dataSource = {data} /> :<div>搜索的用户不存在</div>}</>:<></>}
        </div>
    )
}
const WarppedUserManage = Form.create()(UserManage);

const BlcakList = ()=> {
	const Pdata = {
		page: 1,
		size: 10
	}
	const [data, setData] = useState([]);
	const eventEmmit = emmiter.addListener("handleUsers", ()=> {
		API.getBlockedList(Pdata)
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		})
	})
	useEffect( async ()=> {
		await API.getBlockedList(Pdata)
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		})
		return ()=> {
			emmiter.removeListener(eventEmmit);
		}
	},[])


    const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
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
          key: 'unblockTime',
          dataIndex: 'unblockTime',
        },
        {
          title: '操作',
          key: 'handle',
          dataIndex: 'id',
          render: text => <Button onClick = {()=>{cancel(text)}}>解除</Button>
        },
    ];
      
    const cancel = (id)=> {
		API.removeBlock({userId: id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...data].filter(item => item.id!==id);
				setData(newData);
			}
		})
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
        <>
		<div className = "title">用户管理</div>
		<Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
			<TabPane tab="用户管理" key="1">
				<WarppedUserManage />
				<div className = "warn">还差一个封禁解除接口</div>
			</TabPane>
			<TabPane tab="黑名单" key="2">
				<BlcakList />
			</TabPane>
		</Tabs>
        </>
    )
}

export default Users;