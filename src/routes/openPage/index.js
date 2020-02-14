import React, { useState, useEffect } from "react";
import "./index.less";
import { Icon, Button, Tabs, Card, Modal, Form, Input, Upload} from "antd";
import * as API from "../../config/api";
import Loading from "../../components/loading";
import { BlockPicker   } from 'react-color';

const { TabPane } = Tabs;

const OpenPageContent = (props)=> {
    const [data, setData] = useState([1]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);      
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("black")

    useEffect(()=>{
        const params = {
            page:1,
            size:10  
        }
        API.getAllbootPages(params)
        .then(async res=> {
            if(res.data.code === 0) {
                await setData(res.data.data);
                setLoading(false);
            }
        })
    },[])

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };  

    const { getFieldDecorator } = props.form;


    const handleOk = ()=> {
        setConfirmLoading(true);
        setColor("black")
        setTimeout(() => {
            setConfirmLoading(false);
            setVisible(false);
        }, 2000);
    }
    const handleCancel = ()=> {
        setVisible(false);
    }
    const Content = 
        <div>
            {/* {
                data.map((item)=> {
                    return (
                        <div>
                            
                        </div>
                    )
                })
            } */}
        </div>
    const emptyConent = 
        <div>
            <Card onClick={()=> {setVisible(true)}} hoverable style={{ width: 175, height: 325 }} className = "flex-center">
                <div>
                    <p>您尚未添加任何图片</p>
                    <Button className = "margin-center"><Icon type = "plus"/>添加图片</Button>
                </div>
            </Card>
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
                <div style = {{display: "flex"}}>
                <Form onSubmit={handleSubmit} className="openPage-form">
                    <Form.Item label="悬浮图片" >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" />上传图片
                        </Button>
                        </Upload>,
                    )}
                    </Form.Item>
                    <Form.Item label="背景填充" >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" />上传图片
                        </Button>
                        </Upload>
                    )}
                    </Form.Item>
                    <Form.Item label="选择颜色" >
                    {getFieldDecorator('color', {
                        valuePropName: 'color',
                    })(
                        <BlockPicker    onChange = {(values)=>{setColor(values.hex)}}  />
                    )}
                    </Form.Item>
                </Form>
                
                <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
                </div>
            </Modal>
        </div>

    if(loading) {
        return <Loading />
    }
    else {
        if(data&&data.length) {
            return (<>{Content}</>) 
        }
        else  return (<>{emptyConent}</>) 

    }
}
const WarpedInput = Form.create({ name: 'openPageInput' })(OpenPageContent);

const OpenPage = ()=> {

    const handleSave = ()=> {

    }

    const callback = (key)=> {
        console.log(key);
    }

    return (
        <div>
            <div className = "title">开屏页</div>
            <Tabs defaultActiveKey="1" onChange={callback} style = {{minHeight:"400px"}}>
                <TabPane tab="设置开屏页" key="1">
                    {/* <OpenPageContent /> */}
                    <WarpedInput />
                </TabPane>
            </Tabs>
            <div className = "flex-center">
                <Button onClick = {handleSave}>保存设置</Button>
            </div>
        </div>
    )
}

export default OpenPage;