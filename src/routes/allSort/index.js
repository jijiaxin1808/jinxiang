import React, {useState, useEffect} from "react";
import { Table, Input,  Form, Button, Modal, Tabs } from "antd";
import * as API from "../../config/api";

const { TabPane } = Tabs;

const FirstSort = (props)=> {
    const [ data, setData ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const [ modalData, setModalData ] = useState({})
    const [ option, setOption ] = useState([]);
    const { getFieldDecorator, setFieldsValue, validateFields } = props.form;
    
    useEffect(()=> {
        API.getCategoriesFirst()
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

    const handleOk =async ()=> {
        setConfirmLoading(true);
        if(modalData&&modalData.id) {
            
        }
        else {
            await validateFields((err, values)=> {
                if(!err) {
                    const Qdata = {
                        parentId: 0,
                        level: 1,
                        name: values.name,
                        priority: values.priority
                    }
                    API.createCategories(Qdata)
                    .then(res=> {
                        if(res.data.code === 0) {
                            let newData = [...data];
                            newData.push(res.data.data);
                            setData(newData);
                            setConfirmLoading(false);
                        }
                    })
                }
            })
        }
        
        setVisible(false);
        setConfirmLoading(false);
    }
    const handleCancel = ()=> {
        setVisible(false);
        setFieldsValue({name:"",sort:"",priority:""});
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
                setFieldsValue(record); setModalData(record);
            }}>修改</Button>
        }
    ];
        
    return (
        <>
        <div className = "title-text" style = {{display: "inline-block", marginRight:600}}>编辑一级分类</div>
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
                    rules: [{ required: true, message: '请输入分类名称' }],
                })(
                    <Input
                    placeholder="请输入分类名称"
                    />,
                )}
                </Form.Item>
                <Form.Item label = "权重">
                {getFieldDecorator('priority', {
                    rules: [{ required: true, message: '请输入权重' },
                     {pattern: /^[0-9]\d*$/, message:"请输入数字"}],
                })(
                    <Input/>
                )}
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

const WarpedFirstSort = Form.create()(FirstSort);
const SecondSort = ()=> {
    return (
        <div>二级分类</div>
    )
}



const AllSort = ()=> {
    return (
        <>
        <div className = "title">全部分类</div>
        <Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
        <TabPane tab="一级分类" key="1">
            <WarpedFirstSort />
            <div className = "warn">二级分类都没完成</div>
        </TabPane>
        <TabPane tab="二级分类" key="2">
            <SecondSort />
        </TabPane>
        </Tabs>
        </>
    )
}
export default AllSort;