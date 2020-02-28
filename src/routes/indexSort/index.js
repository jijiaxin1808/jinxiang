import React, { useEffect, useState } from "react";
import "./index.less";
import { Table, Input, InputNumber, Form, Button, Modal, Cascader, Select, Tabs, Upload, Icon } from "antd";
// import { AlphaPicker } from "react-color";
import * as API from "../../config/api";
import emmit from "../../utils/events";

const { TabPane } = Tabs;
const { Option } = Select;


const MainSort = (props)=> {
	const [ mainSortOption, setMainSortOption ] = useState([]);//  主分类选项
	const [ selectedMainSort, setSelectedMainSort ] = useState() //  当前选择的主分类信息
	const [ visible, setVisible ] = useState(false);
	const [ confirmLoading, setConfirmLoading ] = useState(false);
	const [ iconUrl, setIconUrl ] = useState();
	const { getFieldDecorator, setFieldsValue, validateFields } = props.form;

	useEffect(()=> {
		API.getAllmainCategories()
		.then(res=> {
			if(res.data.code === 0) {
				setMainSortOption(res.data.data)
			}
		})	
		const eventEmmit = emmit.addListener("IndexTableSort", ()=> {
			console.log("收到了一个emmit")
			API.getAllmainCategories()
			.then(res=> {
				if(res.data.code === 0) {
					setMainSortOption(res.data.data)
				}
			})
		})
		return ()=> {
			// emmit.removeListener(eventEmmit);
		}
	}, [])


	useEffect(()=> {
		setIconUrl(selectedMainSort&&selectedMainSort.icon);
	},[selectedMainSort])

	const handleOk =async ()=> {
        setConfirmLoading(true);
		await validateFields((err, values)=> {
			if(!err) {
				const { name, priority } = values
				const Qdata = {
					id:selectedMainSort.id,
					categoryName:"",
					name:name, 
					level:priority,
					icon:iconUrl,
					parentId:0
				}
				API.updateMainSort(Qdata)
				.then(res=> {
					if(res.data.code === 0) {
						const index = mainSortOption.findIndex(item=>item.id===selectedMainSort.id);
						const newData = [...mainSortOption];
						newData.splice(index, 1, res.data.data);
						setMainSortOption(newData);
						setConfirmLoading(false);
						setVisible(false);
					}
				})
			}
			else setConfirmLoading(false);
		})
	}
	
	const handleCancel = ()=> {
		setConfirmLoading(false);
		setVisible(false);

	}
	const handleChange = ()=> {
		const { name, priority } = selectedMainSort;
		setFieldsValue({name:name,priority:priority});
		setVisible(true);
	}

	const selectChange = async(id)=> {
		if(mainSortOption.find(item=> item.id === id)) {
			await setSelectedMainSort(mainSortOption.find(item=> item.id === id));
			console.log(selectedMainSort);
		}
	}

	const Props = {
		name: 'image',
		action: 'http://blog.csxjh.vip:8000/images/upload',
		headers: {
		  token: "86f3705005b940a0a21f4d948eb0d04f",
		},
		onChange(info) {
			if(info.file.status === "done" && info.file.response.code === 0) {
				setIconUrl(info.file.response.data);
			}
		  }
	  };	
	return (
		<>
		<Select defaultValue="请选择主分类" style={{ width: 250 }} onChange={(e)=> {selectChange(e)}}>
            {
                mainSortOption.map(item=><Option value = {item.id}>{item.name}</Option>)
            }
        </Select>
		{
			selectedMainSort?
			<><div>
				icon:<img src = {`http://blog.csxjh.vip:8000/${selectedMainSort.icon}` } width = "50px" height = "50px" alt = {"icon"}/><br/>
				权重: {selectedMainSort.priority}<br/>
				<Button onClick = {handleChange}>修改</Button>
			</div>
			<WarppedSortTable data = {selectedMainSort.categoryList}  main = {mainSortOption} nowFirst = {selectedMainSort}/>
			</>:""
		}
		<Modal
		title= "修改icon和权重"
		confirmLoading = {confirmLoading}
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
				<Form.Item label = "权重">
				{getFieldDecorator('priority', {
					rules: [{ required: true, message: '请输入权重' },
					{pattern: /^[0-9]\d*$/, message:"请输入数字"}],
				})(
					<InputNumber/>
				)}
				</Form.Item>
			</Form>
			<Upload {...Props}>
				<Button>
					<Icon type="upload" />点击上传
				</Button>
            </Upload>
		</Modal>
		</>
	)
}

const MainSortTable = (props)=> {


	const [ data, setData ] = useState(props.data) // 用于table的数据
	const [ visible, setVisible ] = useState(false);
	const [ confirmLoading, setConfirmLoading ] = useState(false);
	const [ optionData, setOptionData ] = useState([]); //  这个是全部的1, 2级分类的数据
	const [ secondOptionData, setSecondOptionData ] = useState([]);  //  这个是根据所选的一级分类变化的二级分类
	const [ option, setOption ] = useState(); // 当前选择的一级id
	const [ optionS, setOptionS ] = useState() // 当前选择的二级id
	const { getFieldDecorator, validateFields, setFieldsValue} = props.form;
	
	useEffect(()=> {
		API.getALlCategories()
		.then(res=> {
			if(res.data.code === 0 ) {
				setOptionData(res.data.data);
			}
		})
	}, [])
	function debounce(fn, time) {
		        let timer = null;
		        return function (...args) {
		          clearTimeout(timer);
		          timer = setTimeout(() => {
		            fn.apply(this, args);
		          }, time);
		        };
		      }
	useEffect(()=> {
        if(option) {
			const E = ()=>{emmit.emit("IndexTableSort");console.log("发送了一个emmit")}
			console.log("更新一次")
			debounce(E(),1000)
        }
    },[data])

	useEffect(()=>{
		setData(props.data);
	},[props.data])
	useEffect(()=> {
		const newData = optionData.filter(item => item.id === option);
		if(newData[0]&&newData[0].secondList.length) {
			setSecondOptionData(newData[0].secondList);
		}
		setFieldsValue({sort2:""})
	},[option]);

    const handleOk =async ()=> {
        setConfirmLoading(true);
		await validateFields((err, values)=> {
			if(!err) {
				const categoryName = optionS?[...secondOptionData].filter(item=>item.id===optionS)[0].name:
				optionData.filter(item=>item.id===option)[0].name;
				const Qdata = {
					parentId:props.nowFirst.id,
					name: optionS?optionS:option,
					categoryName:categoryName,
					icon:" ",
					level: optionS?2:1,
				}
				API.createMainCategories(Qdata)
				.then(res=> {
					if(res.data.code === 0) {
						let newData = [...data];
						newData.push({...res.data.data, name:res.data.data.categoryName});
						// newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
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
		setConfirmLoading(false);
	}
	const selectChange = (value)=> {
		setOption(value);
	}
	const selectChangeS = (value)=> {
		setOptionS(value);
	}

	const deleteLabelSort = (id)=> {
		API.deleteMainCategories({id})
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
			key: "id"
		},
		{
			title: "类型(一级/二级)",
			dataIndex: "level",
			key: "level",
			render: text => text===1?"一级":"二级"
		},
		{
			title: "名称",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "操作",
			dataIndex: "id",
			key: "handle",
			render: text=> <Button onClick = {()=>{deleteLabelSort(text)}}>删除</Button>
		}
	];
		
	return (
		<>
		<div className = "title-text" style = {{display: "inline-block", marginRight:800}} >子分类</div>
		<Button onClick = {()=> {setVisible(true)}} type = "primary">新增</Button>
		<Table
		dataSource={data}
		columns={columns}
		/>
		<Modal
		title= "添加主分类下子分类"
		visible={visible}
		confirmLoading = {confirmLoading}
		onOk={handleOk}
		onCancel={handleCancel}
		okText = "确认"
		cancelText = "取消"
		>
			<Form>
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
			</Form>
		</Modal>
		</>
	)

}
const WarppedSortTable = Form.create()(MainSortTable);
const WarppedMainSort = Form.create()(MainSort);

const LabelSort = (props)=> {
	const [ data, setData ] = useState([]); // 用于table的数据
	const [ visible, setVisible ] = useState(false);
	const [ confirmLoading, setConfirmLoading ] = useState(false);
	const [ optionData, setOptionData ] = useState([]); //  这个是全部的1, 2级分类的数据
	const [ secondOptionData, setSecondOptionData ] = useState([]);  //  这个是根据所选的一级分类变化的二级分类
	const [ option, setOption ] = useState(); // 当前选择的一级id
	const [ optionS, setOptionS ] = useState() // 当前选择的二级id
	const { getFieldDecorator, validateFields, setFieldsValue } = props.form;

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
		setFieldsValue({sort2:""})
	},[option]);

    const handleOk =async ()=> {
        setConfirmLoading(true);
		await validateFields((err, values)=> {
			if(!err) {
				const categoryName = optionS?[...secondOptionData].filter(item=>item.id===optionS)[0].name:
				optionData.filter(item=>item.id===option)[0].name;
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
		setConfirmLoading(false);
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
		<Button onClick = {()=> {setVisible(true)}} type = "primary">新增</Button>
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