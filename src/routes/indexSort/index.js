import React, { useEffect, useState } from "react";
import "./index.less";
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, Cascader } from "antd";
import { AlphaPicker } from "react-color";
import * as API from "../../config/api";












const MainSort = (props)=> {
	const [ data, setData ] = useState([]);
	const [ visible, setVisible ] = useState(false);
	const [ confirmLoading, setConfirmLoading ] = useState(false);
	const [ modalData, setModalData ] = useState({})
	const [ option, setOption ] = useState([]);
	const { getFieldDecorator, setFieldsValue } = props.form;

	useEffect(()=> {
		API.getAllmainCategories()
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data)
			}
		})
		API.getALlCategories()
		.then(res=> {
			if(res.data.code === 0 ) {
				const newData = res.data.data.map(item=> ({
						label:item.name,
						value: item.name,
						children: item.secondList.map(item=> ({	
							label:item.name,
							value: item.name
					}))
				}))
				setOption(newData);
			}
		})
	}, [])

	const handleOk = ()=> {
		setVisible(false);
	}
	const handleCancel = ()=> {
		setVisible(false);
		setFieldsValue({name:"",sort:"",priority:""});
	}

	const columns = [
		{
			title: '序号',
			dataIndex: 'id',
			editable: false,
		},
		{
			title: '名称',
			dataIndex: 'name',
			editable: true,
		},
		{
			title: '分类',
			dataIndex: 'categoryList',
			editable: true,
			render: text => (text.map(item => (item.name) ))
		},
		{
			title: '权重',
			dataIndex: 'priority',
			editable: true,
		},
		{
			title: 'icon',
			dataIndex: 'icon',
			editable: true,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) => <Button onClick = {()=> {setVisible(true); 
				setFieldsValue(record);
			}}>修改</Button>
		}
	];
	  
	return (
		<>
		<div className = "title-text" style = {{display: "inline-block", marginRight:600}}>主分类</div>
		<Button onClick = {()=> {setVisible(true)}}>新增</Button>
		<Table
		dataSource={data}
		columns={columns}
		/>
		<Modal
		title= "标签分类"
		visible={visible}
		onOk={handleOk}
		onCancel={handleCancel}
		okText = "确认"
		cancelText = "取消"
		>
			<Form>
				<Form.Item label = "名称">
				{getFieldDecorator('name', {
					rules: [{ required: true, message: '请输入名称' }],
				})(
					<Input
					placeholder="请输入标签名称"
					/>,
				)}
				</Form.Item>
				<Form.Item label = "分类">
				{getFieldDecorator('sort', {
					rules: [{ required: true, message: 'Please input your Password!' }],
				})(
					<Cascader options={option}  placeholder="请选择分类" />
				)}
				</Form.Item>
				<Form.Item>
				{getFieldDecorator('priority', {
					rules: [{ required: true, message: '请输入权重' },
					{pattern: /^[0-9]\d*$/, message:"请输入数字"}],
				})(
					<InputNumber/>
				)}
				</Form.Item>
			</Form>
		</Modal>
		</>
	)
}

		  
const WarppedMainSort = Form.create()(MainSort);


const LabelSort = (props)=> {
	const [ data, setData ] = useState([]);
	const [ visible, setVisible ] = useState(false);
	const [ confirmLoading, setConfirmLoading ] = useState(false);
	const [ modalData, setModalData ] = useState({})
	const [ option, setOption ] = useState([]);
	const { getFieldDecorator, setFieldsValue } = props.form;

	useEffect(()=> {
		API.getAllLabelCategories()
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data)
			}
		})
		API.getALlCategories()
		.then(res=> {
			if(res.data.code === 0 ) {
				const newData = res.data.data.map(item=> ({
						label:item.name,
						value: item.name,
						children: item.secondList.map(item=> ({	
							label:item.name,
							value: item.name
					}))
				}))
				setOption(newData);
			}
		})
	}, [])

	const handleOk = ()=> {
		setVisible(false);
	}
	const handleCancel = ()=> {
		setVisible(false);
		setFieldsValue({name:"",sort:"",priority:""});
	}

	const columns = [
		{
			title: '序号',
			dataIndex: 'id',
			editable: false,
		},
		{
			title: '名称',
			dataIndex: 'name',
			editable: true,
		},
		{
			title: '分类',
			dataIndex: 'categoryId',
			editable: true,
		},
		{
			title: '权重',
			dataIndex: 'priority',
			editable: true,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) => <Button onClick = {()=> {setVisible(true); 
				setFieldsValue(record);
			}}>修改</Button>
		}
	];
		
	return (
		<>
		<div className = "title-text" style = {{display: "inline-block", marginRight:600}} >标签分类</div>
		<Button onClick = {()=> {setVisible(true)}}>新增</Button>
		<Table
		dataSource={data}
		columns={columns}
		/>
		<Modal
		title= "标签分类"
		visible={visible}
		onOk={handleOk}
		onCancel={handleCancel}
		okText = "确认"
		cancelText = "取消"
		>
			<Form>
				<Form.Item label = "名称">
				{getFieldDecorator('name', {
					rules: [{ required: true, message: '请输入名称' }],
				})(
					<Input
					placeholder="请输入标签名称"
					/>,
				)}
				</Form.Item>
				<Form.Item label = "分类">
				{getFieldDecorator('sort', {
					rules: [{ required: true, message: 'Please input your Password!' }],
				})(
					<Cascader options={option}  placeholder="请选择分类" />
				)}
				</Form.Item>
				<Form.Item>
				{getFieldDecorator('priority', {
					rules: [{ required: true, message: '请输入权重' },
					{pattern: /^[0-9]\d*$/, message:"请输入数字"}],

				})(
					<InputNumber/>
				)}
				</Form.Item>
			</Form>
		</Modal>
		</>
	)
}

			
const WarppedLabelSort = Form.create()(LabelSort);

const IndexSort = ()=> {
	return (
		<>
			<div className = "title">首页分类</div> 
			<div className = "warn">接口有点没懂   此页面互动请求都没写</div>
			<WarppedMainSort />
			<WarppedLabelSort />
		</>
	)
}



export default IndexSort;