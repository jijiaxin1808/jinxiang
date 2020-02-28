import React, { useState, useEffect } from "react";
import "./index.less";
import { Icon, Button, Tabs, Card, Modal, Form, Upload} from "antd";
import * as API from "../../config/api";
import { BlockPicker   } from 'react-color';

const { TabPane } = Tabs;

const OpenPageContent = (props)=> {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);      
    // const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("black")
    const [imgUrl1, setImgUrl1] = useState();
    const [imgUrl2, setImgUrl2] = useState();
    const [ deleteAble, setDeleteAble ] = useState(false);
	useEffect(()=> {	
		if(!deleteAble && data.length && data.filter(item => item.showed === true).length) {
            setDeleteAble(true);
            setVisible(false);
		}
		else if(deleteAble&&!data.filter(item => item.showed === true).length) {
            setDeleteAble(false);
            setVisible(false);
        }
	},[data])

    useEffect(()=>{
        const params = {
            page:1,
            size:10  
        }
        API.getAllbootPages(params)
        .then(async res=> {
            if(res.data.code === 0) {
                await setData(res.data.data);
                // setLoading(false);
            }
        })
    },[])

    const upLine = (id)=> {
        const Qdata = {
            id: id,
            showed: true
        }
        API.updateOpenPage(Qdata)
        .then(res=> {
            if(res.data.code === 0) {
                let index = data.findIndex(item=>item.id===id);
                const newData = [...data];
                newData[index].showed = true;
                setData(newData);
            }
        })
    };
    const downLine = (id)=> {
        const Qdata = {
            id: id,
            showed: false
        }
        API.updateOpenPage(Qdata)
        .then(res=> {
            if(res.data.code === 0) {
                let index = data.findIndex(item=>item.id===id);
                const newData = [...data];
                newData[index].showed = false;
                setData(newData);
            }
        })
    }

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

    const { getFieldDecorator, setFieldsValue } = props.form;

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
                newData.unshift(res.data.data);
                setData(newData);
            }
        })
        setColor("black")
        setImgUrl1("");
        setImgUrl2("");
        setFieldsValue({img1:"",img2:""})
        setConfirmLoading(false);
        setVisible(false);
    }

    const handleCancel = ()=> {
        setVisible(false);
        setConfirmLoading(false);
        setFieldsValue({img1:"",img2:""})
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
                            <div style = {{    backgroundColor: `${item.bgColor}`  ,backgroundImage:`
                            url(http://blog.csxjh.vip:8000/${item.upperImage}),
                            url(http://blog.csxjh.vip:8000/${item.bgImage})
                            `,backgroundRepeat:"no-repeat",backgroundSize:"contain"}} 
                             className = "openPage-page"></div>
                            {/* <img src = {`http://blog.csxjh.vip:8000/${item.upperImage}`}/> */}
                            {item.showed?<Button onClick = {()=>{downLine(item.id)}}>下线</Button>:
                            <Button disabled = {deleteAble} onClick = {()=>{upLine(item.id)}}>上线</Button>}
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
                          <Icon type="upload"  showUploadList = {false}/>点击上传
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
                        <BlockPicker color  = {color} onChange = {(values)=>{setColor(values.hex)}}  />
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
                        <BlockPicker  color = {color}  onChange = {(values)=>{setColor(values.hex)}}  />
                    )}
                    </Form.Item>
                </Form>
                
                <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
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
    else {
        if(data&&data.length) {
            return (<>{Content}</>) 
        }
        else  return (<>{emptyConent}</>) 

    }
}
const WarpedInput = Form.create({ name: 'openPageInput' })(OpenPageContent);

const OpenPage = ()=> {

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
        </div>
    )
}

export default OpenPage;