import React, { useState, useEffect } from "react";
import "./index.less";
import { Icon, Button, Tabs, Card, Modal, Form, Upload} from "antd";
import * as API from "../../config/api";
import Loading from "../../components/loading";
import { BlockPicker   } from 'react-color';

const { TabPane } = Tabs;

const OpenPageContent = (props)=> {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);      
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("black")
    const [imgUrl1, setImgUrl1] = useState();
    const [imgUrl2, setImgUrl2] = useState();

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

    const Props = {
      name: 'image',
      action: 'http://blog.csxjh.vip:8000/images/upload',
      headers: {
        token: "86f3705005b940a0a21f4d948eb0d04f",
      },
      onChange(info) {
          if(info.file.status === "done" && info.file.response.code === 0) {
              setImgUrl1(info.file.response.data);
          }
        }
    };
    const Props2 = {
        name: 'image',
        action: 'http://blog.csxjh.vip:8000/images/upload',
        headers: {
          token: "86f3705005b940a0a21f4d948eb0d04f",
        },
        onChange(info) {
            if(info.file.status === "done" && info.file.response.code === 0) {
                setImgUrl2(info.file.response.data);
            }
          }
      };

    const handleOk =async()=> {
        setConfirmLoading(true);
        const openPageData = {
            upperImage: imgUrl1,
            bgColor: color,
            bgImage: imgUrl2
        }
        await API.createopenPage(openPageData)
        .then(res=> {
            if(res.data.code === 0) {
                const newData = [...data];
                newData.unshift(openPageData);
                setData(newData);
            }
        })
        setColor("black")
            setConfirmLoading(false);
            setVisible(false);
    }
    const handleCancel = ()=> {
        setVisible(false);
    }
    const handleDelete = (id)=> {
        API.deleteopenPage({id})
        .then(res=> {
            if(res.data.code === 0) {
                const newData = [...data].filter(item=>{
                    return item.id!==id
                });
                setData(newData);
            }
        })
    }
    const Content = 
        <div className = "openPage-pages">
            {
                data.map(item=> {
                    return (
                        <div key = {item.id} style = {{marginLeft: 20}}>
                            <div style = {{background:`url(${item.upperImage}),url(${item.bgImage}),${item.bgColor}`}} className = "openPage-page"></div>
                            {item.showed?<Button disabled = {true}>使用中</Button>:<Button>上线</Button>}
                            <Button onClick = {()=>{handleDelete(item.id)}} style = {{marginLeft: 30}}>删除</Button>
                        </div>
                    )
                })
            }
            <Card onClick={()=> {setVisible(true)}} hoverable style={{ width: 180, height: 335, marginLeft: 20 }} className = "flex-center">
                <div>
                <p>继续添加图片</p>
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
                    {getFieldDecorator('img1', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload {...Props}>
                        <Button>
                          <Icon type="upload" />点击上传
                        </Button>
                      </Upload>,
                    )}
                    </Form.Item>
                    <Form.Item label="背景填充" >
                    {getFieldDecorator('img2', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload {...Props2}>
                        <Button>
                          <Icon type="upload" />点击上传
                        </Button>
                      </Upload>,
                    )}
                    </Form.Item>
                    <Form.Item label="选择颜色" >
                    {getFieldDecorator('color', {
                        valuePropName: 'color',
                    })(
                        <BlockPicker defaultValue = "black"   onChange = {(values)=>{setColor(values.hex)}}  />
                    )}
                    </Form.Item>
                </Form>
                
                <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
                </div>
            </Modal>
        </div>

    const emptyConent = 
        <div>
            <Card onClick={()=> {setVisible(true)}} hoverable style={{ width: 180, height: 335 }} className = "flex-center">
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
                    {getFieldDecorator('img1', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload {...Props}>
                        <Button>
                          <Icon type="upload" />点击上传
                        </Button>
                      </Upload>,
                    )}
                    </Form.Item>
                    <Form.Item label="背景填充" >
                    {getFieldDecorator('img2', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                    })(
                        <Upload {...Props2}>
                        <Button>
                          <Icon type="upload" />点击上传
                        </Button>
                      </Upload>,
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
            <div className = "warn">还差一个首屏页的状态更改   还有具体的图片叠加效果(等ui图)</div>
        </div>
    )
}

export default OpenPage;