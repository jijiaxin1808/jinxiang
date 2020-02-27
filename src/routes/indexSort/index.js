import React, { useEffect, useState } from "react";
import "./index.less";
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, Cascader, Select, Tabs } from "antd";
// import { AlphaPicker } from "react-color";
import * as API from "../../config/api";

const { TabPane } = Tabs;
const { Option } = Select;

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
	const [ optionData, setOptionData ] = useState([]); //  这个是全部的1, 2级分类的数据
	const [ secondOptionData, setSecondOptionData ] = useState([]);  //  这个是根据所选的一级分类变化的二级分类
	const [ option, setOption ] = useState(); // 当前选择的一级id
	const [ optionS, setOptionS ] = useState() // 当前选择的二级id
	const { getFieldDecorator, validateFields } = props.form;

	useEffect(()=> {
		API.getAllLabelCategories()
		.then(res=> {
			if(res.data.code === 0) {
				setData(res.data.data);
			}
		})

		API.getALlCategories()
		.then(res=> {
			if(res.data.code === 0 ) {
				setOptionData(res.data.data);
			}
		})
	}, [])

	useEffect(()=> {
		const newData = optionData.filter(item => item.id === option);
		if(newData[0]&&newData[0].secondList.length) {
			setSecondOptionData(newData[0].secondList);
		}
	},[option]);

    const handleOk =async ()=> {
        setConfirmLoading(true);
		await validateFields((err, values)=> {
			if(!err) {
				const categoryName = optionS?[...secondOptionData].filter(item=>item.id==optionS)[0].name:
				optionData.filter(item=>item.id==option)[0].name;
				const Qdata = {
					level: optionS?2:1,
					name: values.name,
					priority: values.priority,
					categoryName:categoryName,
					categoryId:optionS?optionS:option
				}

				API.createLabelCategories(Qdata)
				.then(res=> {
					if(res.data.code === 0) {
						let newData = [...data];
						newData.push(res.data.data);
						newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
						setData(newData);
						setVisible(false);
						setConfirmLoading(false);
					}
				})
			}
			else setConfirmLoading(false);
		})
		}

	const handleCancel = ()=> {
		setVisible(false);
	}
	const selectChange = (value)=> {
		setOption(value);
	}
	const selectChangeS = (value)=> {
		setOptionS(value);
	}

	const deleteLabelSort = (id)=> {
		API.deleteLabelCategories({id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...data].filter(item => item.id !== id);
				setData(newData);
			}
		})
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
			dataIndex: 'categoryName',
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
			key: "operation",
			render: (text, record) => <Button onClick = {()=> {deleteLabelSort(record.id)}}>删除</Button>
		}
	];
		
	return (
		<>
		<div className = "title-text" style = {{display: "inline-block", marginRight:800}} >标签分类</div>
		<Button onClick = {()=> {setVisible(true)}}>新增</Button>
		<Table
		dataSource={data}
		columns={columns}
		/>
		<Modal
		title= "标签分类"
		visible={visible}
		confirmLoading = {confirmLoading}
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
						/>
					)}
				</Form.Item>
				<Form.Item label = "一级分类">
					{getFieldDecorator('sort1', {
						rules: [{ required: true, message: '请选择一级分类' }],
					})(
						<Select placeholder = "请选择一级分类"  style={{ width: 250 }} onChange={(e)=> {selectChange(e)}}>
						{
							optionData.map(item=><Option value = {item.id}>{item.name}</Option>)
						}
						</Select>
					)}
				</Form.Item>
				<Form.Item label = "二级分类">
					{getFieldDecorator('sort2', {
						// rules: [{ required: true, message: '请选择二级分类'}],
					})(
						<Select placeholder = "请选择二级分类" style={{ width: 250 }} onChange={(e)=> {selectChangeS(e)}}>
							<Option value = {""}>{"选择全部二级"}</Option>
						{
							secondOptionData.map(item=><Option value = {item.id}>{item.name}</Option>)
						}
						</Select>
					)}
				</Form.Item>
				<Form.Item label = "请输入权重">
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
			<Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
        		<TabPane tab="主分类" key="1">
					<WarppedMainSort />
				</TabPane>
				<TabPane tab="标签分类" key="2">
					<WarppedLabelSort />
				</TabPane>
			</Tabs>
		</>
	)
}



export default IndexSort;