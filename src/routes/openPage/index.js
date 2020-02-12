import React, { useState, useEffect } from "react";
import "./index.less";
import { Icon, Button, Tabs, Card, Modal, Form, Input, Upload} from "antd";

const { TabPane } = Tabs;



const OpenPageContent = (props)=> {
    let [data, setData] = useState([1]);
    let [visible, setVisible] = useState(false);
    let [confirmLoading, setConfirmLoading] = useState(false);      
    
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
            {
                data.map((item)=> {
                    return (
                        <div>
                            
                        </div>
                    )
                })
            }
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
                    <Form.Item label="背景颜色" >
                    {getFieldDecorator('upload', {
                        valuePropName: 'color',
                    })(
                       <Input prefix ={ <Icon type="bg-colors" />} />
                    )}
                    </Form.Item>
                </Form>
                <div className = "openPage-preview"></div>
                </div>
            </Modal>
        </div>

    if(!data.length) {
        return (
            <>
                {emptyConent}
            </>
        )
    }

    return (
        <>
            {Content}
        </>
    )
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