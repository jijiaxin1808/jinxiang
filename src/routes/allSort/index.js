import React, {useState, useEffect} from "react";
import { Table, Input, Button, Modal, Tabs, Select, Form } from "antd";
import * as API from "../../config/api";

const { TabPane } = Tabs;
const { Option } = Select;

const FirstSort = (props)=> {
    const [ data, setData ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const [ modalData, setModalData ] = useState({})
    const [ option, setOption ] = useState([]);
    const [form] = Form.useForm()

    useEffect(()=> {
        API.getALlCategories()
        .then(res=> {
            if(res.data.code === 0 ) {
                setData(res.data.data);
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

    const handleOk =async ()=> {
        setConfirmLoading(true);
        if(modalData&&modalData.id) {
            form.validateFields()
            .then(values=>{
                const Qdata = {
                    id: modalData.id,
                    parentId: 0,
                    level: 1,
                    name: values.name,
                    priority:  Number.parseInt(values.priority,10)
                }
                API.updateCategories(Qdata)
                .then(res=> {
                    if(res.data.code === 0) {
                        let newData = [...data];
                        const index = data.findIndex(item=>item.id === Qdata.id);
                        newData.splice(index, 1, Qdata);
                        newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
                        setData(newData);
                        setConfirmLoading(false);
                        setVisible(false);
                    }
                })
            })
        }
        else {//  增加
            form.validateFields()
            .then(values=> {
                const Qdata = {
                    parentId: 0,
                    level: 1,
                    name: values.name,
                    priority: Number.parseInt(values.priority,10)
                }
                API.createCategories(Qdata)
                .then(res=> {
                    if(res.data.code === 0) {
                        let newData = [...data];
                        newData.push({...Qdata, id: res.data.data});
                        newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
                        setData(newData);
                        setConfirmLoading(false);
                        setVisible(false);
                    }
                })
            })

        }
    }

    const handleCancel = ()=> {
        setConfirmLoading(false);
        setVisible(false);
        form.setFieldsValue({name:"",sort:"",priority:""});
        setModalData("");
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            editable: false,
        },
        {
            title: '分类',
            dataIndex: 'name',
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
                form.setFieldsValue(record); setModalData(record);
            }}>修改</Button>
        }
    ];
        
    return <>
    <div className = "title-text" style = {{display: "inline-block", marginRight:600}}>编辑一级分类</div>
    <Button onClick = {()=> {setVisible(true)}} type = "primary">新增</Button>
    <Table
    dataSource={data}
    columns={columns}
    />
    <Modal
    title= "一级分类"
    confirmLoading = {confirmLoading}
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText = "确认"
    cancelText = "取消"
    >
        <Form form = {form}>
            <Form.Item label = "名称" name = "name"
            rules = {[{ required: true, message: '请输入分类名称' }]}>
                <Input
                placeholder="请输入分类名称"/>
            </Form.Item>
            <Form.Item label = "权重" name = "priority"
            rules = {[{ required: true, message: '请输入权重' },
            {pattern: /^[0-9]\d*$/, message:"请输入数字"}]}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>;
}

const SecondSort = (props)=> {
    const [ data, setData ] = useState([]);
    const [ sortData, setSortData ] = useState([]);  // 所有的一二级信息
    const [ fristOptions, setFirstOptions] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const [ modalData, setModalData ] = useState({})
    const [ option, setOption ] = useState();  // 当前选择的一级分类
    const [form] = Form.useForm();
    
    useEffect(()=> {
        API.getALlCategories()
        .then(res=> {
            if(res.data.code === 0 ) {
                setFirstOptions(res.data.data);
                setSortData(res.data.data);
            }
        })
    }, [])

    useEffect(()=> {
        if(option) {
            const index = [...sortData].findIndex(item=>item.id===option);
            const newData = [...sortData];
            newData[index].secondList = [...data];
            setSortData(newData);
        }
    },[data])

    useEffect(()=> {
        const newData = sortData.filter(item => item.id === option);
        setData(newData[0]&&newData[0].secondList);
    },[option])
    
    const selectChange = (value)=> {
        setOption(value);
    }

    const handleOk =async ()=> {
        setConfirmLoading(true);
        if(modalData&&modalData.id) {
            form.validateFields()
            .then(values => {
                const Qdata = {
                    id: modalData.id,
                    parentId: option,
                    level: 2,
                    name: values.name,
                    priority: values.priority
                }
                API.updateCategories(Qdata)
                .then(res=> {
                    if(res.data.code === 0) {
                        let newData = [...data];
                        const index = data.findIndex(item=>item.id === Qdata.id);
                        newData.splice(index, 1, Qdata);
                        newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
                        setData(newData);
                        setConfirmLoading(false);
                        setVisible(false);
                    }
                })
            })
        }
        
        else {
            form.validateFields()
            .then(values=> {
                const Qdata = {
                    parentId: option,
                    level: 2,
                    name: values.name,
                    priority: values.priority
                }
                API.createCategories(Qdata)
                .then(res=> {
                    if(res.data.code === 0) {
                        let newData = [...data];
                        newData.push({...Qdata, id: res.data.data});
                        newData.sort((item1,item2)=>{return item1["priority"]-item2["priority"]})
                        setData(newData);
                        setVisible(false);
                        setConfirmLoading(false);
                    }
                })
            })
        }
        setConfirmLoading(false);
    }
    const handleCancel = ()=> {
        setConfirmLoading(false);
        setVisible(false);
        form.setFieldsValue({name:"",sort:"",priority:""});
        setModalData("");
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: "id",
            editable: false,
        },
        {
            title: '分类',
            dataIndex: 'name',
            key:"name",
            editable: true,
        },
        {
            title: '权重',
            dataIndex: 'priority',
            key: "priority",
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: "operation",
            render: (text, record) => <Button onClick = {()=> {setVisible(true); 
                form.setFieldsValue(record); setModalData(record);
            }}>修改</Button>
        }
    ];
        
    return <>
    <div className = "title-text" style = {{display: "inline-block", marginRight:600}}>二级分类</div>
    <Select defaultValue="请选择一级分类" style={{ width: 250 }} onChange={(e)=> {selectChange(e)}}>
        {
            fristOptions.map(item=><Option value = {item.id}>{item.name}</Option>)
        }
    </Select>
    <Button onClick = {()=> {setVisible(true)}} disabled = {!option} type = "primary">新增</Button>
    <Table
    dataSource={data}
    columns={columns}
    />
    <Modal
    title= "标签分类"
    confirmLoading = {confirmLoading}
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText = "确认"
    cancelText = "取消"
    >
        <Form form = {form}>
            <Form.Item label = "名称" name = "name"
            rules = {[{ required: true, message: '请输入分类名称' }]}>
                <Input
                placeholder="请输入分类名称"
                />
            </Form.Item>
            <Form.Item label = "权重" name = "priority"
            rules = {[{ required: true, message: '请输入权重' },
            {pattern: /^[0-9]\d*$/, message:"请输入数字"}]}>
                <Input/>
            </Form.Item>
        </Form>
    </Modal>
    </>;
}

const AllSort = ()=> {
    return (
        <>
        <div className = "title">全部分类</div>
        <Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
        <TabPane tab="一级分类" key="1">
            <FirstSort />
        </TabPane>
        <TabPane tab="二级分类" key="2">
            <SecondSort />
        </TabPane>
        </Tabs>
        </>
    )
}
export default AllSort;