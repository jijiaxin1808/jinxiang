import React, { useEffect, useState } from "react";
import { Tabs, Table, Form, Modal, message, Input, Button } from "antd";
import * as API from "../../config/api";
import Reg from "../../utils/reg";
const { TabPane } = Tabs;

const Offical = ()=> {
	const Pdata = {
		page: 1,
		size: 10
    }
    const [data, setData] = useState([]);
    const [ form ] = Form.useForm();
    const [visible, setVisible] = useState(false);  //  modal页是否可见
    const [confirmLoading, setConfirmLoading] = useState(false); //  modal页确认按钮loading
    const [ validating, setValidatIng ] = useState(false);
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

	useEffect(()=> {
		API.getAllOffical(Pdata)
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		})
	},[])

    const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '账号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '使用者',
          key: 'name',
          dataIndex: 'name',
        }
    ];
      
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


    const handleOk =async()=> {
        setConfirmLoading(true);
    }  //  点击modal确认按钮

    const handleCancel = ()=> {
        setVisible(false);
        setConfirmLoading(false);
    }  // 点击modal取消按钮

    return (
        <div>
            <div className = "title-text">近享官方账号</div>
            <Button onClick = {() => setVisible(true)} >新增</Button>
            <Table columns = {columns} dataSource = {data} pagination = {false} />
            <Modal
            title="新增开屏页"
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            className = "openPage-modal"
            okText = "确认"
            cancelText = "取消"
            >
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
			</Form>
            </Modal>
        </div>
    )
}


const AllSchool = ()=> {
	const Pdata = {
		page: 1,
		size: 10
    }
    const [data, setData] = useState([]);
    const [ form ] = Form.useForm();
    const [visible, setVisible] = useState(false);  //  modal页是否可见
    const [confirmLoading, setConfirmLoading] = useState(false); //  modal页确认按钮loading
    const [ validating, setValidatIng ] = useState(false);
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

	useEffect(()=> {
		API.getAllOffical(Pdata)
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		})
	},[])

    const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '账号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '使用者',
          key: 'name',
          dataIndex: 'name',
        }
    ];
      
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


    const handleOk =async()=> {
        setConfirmLoading(true);
    }  //  点击modal确认按钮

    const handleCancel = ()=> {
        setVisible(false);
        setConfirmLoading(false);
    }  // 点击modal取消按钮

    return (
        <div>
            <div className = "title-text">近享官方账号</div>
            <Button onClick = {() => setVisible(true)} >新增</Button>
            <Table columns = {columns} dataSource = {data} pagination = {false} />
            <Modal
            title="新增开屏页"
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            className = "openPage-modal"
            okText = "确认"
            cancelText = "取消"
            >
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
			</Form>
            </Modal>
        </div>
    )
}


const SchoolA = ()=> {
    return (
        <>
		<div className = "title">学校以及账号</div>
		<Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
			<TabPane tab="所有学校" key="1">
				<AllSchool />
			</TabPane>
			<TabPane tab="近享官方账号" key="2">
				<Offical />
			</TabPane>
		</Tabs>
        </>
    )
}
export default SchoolA;