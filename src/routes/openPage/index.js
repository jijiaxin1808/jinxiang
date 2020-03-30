import React, { useState, useEffect } from "react";
import "./index.less";
import {  Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, Modal, Upload, message, Form } from "antd";
import * as API from "../../config/api";
import { BlockPicker   } from 'react-color';

const OpenPage = (props)=> {
    const [data, setData] = useState([]);   //  启动页总数据
    const [visible, setVisible] = useState(false);  //  modal页是否可见
    const [confirmLoading, setConfirmLoading] = useState(false); //  modal页确认按钮loading
    const [color, setColor] = useState("black")   //  选择的颜色
    const [imgUrl, setImgUrl] = useState(["",""]);  //  上传的照片url数组
    const [ handleAble, setHandleAble ] = useState(false);  //  该图片是否可以上线
    const [form] = Form.useForm();  //  控制modal里的form

	useEffect(()=> {	
		if(!handleAble && data.length && data.filter(item => item.showed === true).length) {
            setHandleAble(true);
            setVisible(false);
		}
		else if(handleAble&&!data.filter(item => item.showed === true).length) {
            setHandleAble(false);
            setVisible(false);
        }
	},[data])  //  监听上线状态的变化

    useEffect(()=>{
        const params = {
            page:1,
            size:10  
        }
        API.getAllbootPages(params)
        .then(res=> {
            if(res.data.code === 0) {
                setData(res.data.data);
            }
        })
    },[])  // 初始化数据

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
    };  //  上线函数  让启动页上线

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
    }; // 下线函数 让启动页下线

    const Props = {
      name: 'image',
      action: 'http://blog.csxjh.vip:8000/images/upload',
      headers: {
        token: "86f3705005b940a0a21f4d948eb0d04f",
      },
      onChange(info) {
          if(info.file.status === "done" && info.file.response.code === 0) {
            setImgUrl([info.file.response.data, imgUrl[1]])
          }
        }
    };  // upload参数1

    const Props2 = {
        name: 'image',
        action: 'http://blog.csxjh.vip:8000/images/upload',
        headers: {
          token: "86f3705005b940a0a21f4d948eb0d04f",
        },
        onChange(info) {
            if(info.file.status === "done" && info.file.response.code === 0) {
                setImgUrl([imgUrl[0], info.file.response.data])
            }
          }
      }; // upload参数2

    const handleOk =async()=> {
        setConfirmLoading(true);
        console.log(imgUrl)
        const openPageData = {
            upperImage: imgUrl[0],
            bgColor: color,
            bgImage: imgUrl[1]
        }
        if(!(imgUrl[0]&&imgUrl[1])) {
            message.error("请上传两张对应的图片");
            setConfirmLoading(false);
        }
        else {
            await API.createopenPage(openPageData)
            .then(res=> {
                if(res.data.code === 0) {
                    const newData = [...data];
                    newData.unshift(res.data.data);
                    setData(newData);
                    setConfirmLoading(false);
                    setVisible(false);
                }
            })
        }
        setColor("black");
        setImgUrl(["",""]);
        form.setFieldsValue({img1:"",img2:""})
    }  //  点击modal确认按钮

    const handleCancel = ()=> {
        setVisible(false);
        setConfirmLoading(false);
        setImgUrl(["", ""])
        form.setFieldsValue({img1:"",img2:""})
    }  // 点击modal取消按钮

    const handleDelete = (id)=> {
        API.deleteopenPage({id})
        .then(res=> {
            if(res.data.code === 0) {
                const newData = [...data].filter(item=> item.id!==id);
                setData(newData);
            }
        })
    } // 点击删除按钮

    return (
        <>
            <div className = "title">开屏页</div>
            <div className = "title-text">设置开屏页</div>
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
                <Form className="openPage-form" form = {form}>
                    <Form.Item label="悬浮图片" name = "img1"  >
                        <Upload {...Props}>
                            <Button>
                                <LegacyIcon type="upload"  showUploadList = {false}/>点击上传
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="背景填充" name = "img2">
                        <Upload {...Props2}>
                            <Button>
                            <LegacyIcon type="upload" />点击上传
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="选择颜色" name = "color">
                        <BlockPicker color  = {color} onChange = {(values)=>{setColor(values.hex)}}  />
                    </Form.Item>
                </Form>
                <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
                </div>
            </Modal>
            <div className = "openPage-pages">
            {
                data.length?data.map(item=> {
                    return (
                        <div key = {item.id} style = {{marginLeft: 20}}>
                            <div style = {{    backgroundColor: `${item.bgColor}`  ,backgroundImage:`
                            url(http://blog.csxjh.vip:8000/${item.upperImage}),
                            url(http://blog.csxjh.vip:8000/${item.bgImage})
                            `,backgroundRepeat:"no-repeat",backgroundSize:"contain"}} 
                             className = "openPage-page"></div>
                            {item.showed?<Button onClick = {()=>{downLine(item.id)}}>下线</Button>:
                            <Button disabled = {handleAble} onClick = {()=>{upLine(item.id)}}>上线</Button>}
                            <Button onClick = {()=>{handleDelete(item.id)}} style = {{marginLeft: 30}}>删除</Button>
                        </div>
                    )
                }):""
            }
            <Card onClick={()=> {setVisible(true)}} hoverable style={{ width: 180, height: 335, marginLeft: 20 }} className = "flex-center">
                <div>
                <p>{data.length?"继续添加开屏页":"您尚未添加任何图片"}</p>
                <Button className = "margin-center"><LegacyIcon type = "plus"/>添加图片</Button>
                </div>
            </Card>
            </div>
        </>
    )
}

export default OpenPage;