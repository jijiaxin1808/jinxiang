import React from 'react';
import { Form, Input, Select, Button, Icon, Upload } from 'antd';
import './index.less';
import * as API from '../../../config/api';
  
  const { Option } = Select;

  class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // confirmDirty: false,
            types: '',
            Name: "",
            Activity: "",
            Picture: "",
            Pic:{
                name: 'image',
                action: 'http://blog.csxjh.vip:8000/images/upload',
                headers: {
                    token: "86f3705005b940a0a21f4d948eb0d04f",
                }
            }
          };
    }
    
    handleSubmit = e => {
      e.preventDefault();
      let standard = true;
      let Message = {};
      if(this.state.Name === ''){
          alert("请填写名称");
          standard = false;
      }
      if(this.state.types === ''){
          alert("请选择类型");
          standard = false;
      }else{
          Message = {
            ...Message,
            "type": this.state.types==="activity"?"活动":"图片"
          }
      }
      if(this.state.types === "activity"){
        if(this.state.Activity === ''){
            alert("请填写活动ID");
            standard = false;
        }else{
            Message = {
                ...Message,
                "content": this.state.Activity
            }
        } 
      }
      if(this.state.types === "picture"){
        if(this.state.Picture === ''){
            alert("请上传图片");
            standard = false;
        }else{
            Message = {
                ...Message,
                "content": this.state.Picture.file.name
            }
        } 
      }
      if(standard){
        API.createCarousels(Message).then().catch(()=>{
            console.log("错误")
        });
      }
      
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          
        }
      });
    };
    
    handleReset = () => {
        this.setState({
            types: ''
        })
        this.props.form.resetFields();
        this.props.handleCancel();
    };

      ChangeSelect(e){
        if(e==="activity"){
            this.setState({ types: 'activity' })
        }else if(e==="picture"){
            this.setState({types: 'picture'})
        }else{
            this.setState({types: ''})
        }
    }

    validateServiceName = (rule, value, callback) => {
        this.setState({
            Name: value
        })
    }
    
    validateServiceActivity = (rule, value, callback) =>{
        this.setState({
          Activity: value
        })
    }

    validateServicePicture = (rule, value, callback) =>{
      this.setState({
        Picture: value
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
  
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('Name', {
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },{
                    validator: this.validateServiceName 
                }
              ],
            })
            (<Input placeholder="请填写名称"/>)}
          </Form.Item>

          <Form.Item label="类型">
            {getFieldDecorator('Type', {
              rules: [{ required: true, message: '请输入类型' }],
            })(
              <Select placeholder="请输入类型" onChange={(value)=>this.ChangeSelect(value)}>
                  <Option value="activity">活动</Option>
                  <Option value="picture">图片</Option>
              </Select>
            )}
          </Form.Item>
          
          <Form.Item label="活动ID:" className={this.state.types==="activity"?'':'Hidden'}>
            {getFieldDecorator('Activity:', {
              rules: [
                {
                  required: this.state.types==="activity"?true:false,
                  message: '请输入活动ID:',
                },{
                    validator: this.validateServiceActivity
                }
              ],
            })(<Input placeholder="请填写活动ＩＤ"/>)}
          </Form.Item>
          <Form.Item label="图片:" className={this.state.types==="picture"?'':'Hidden'}>
            {getFieldDecorator('Picture:', {
              rules: [
                {
                  required: this.state.types==="picture"?true:false,
                  message: '请输入图片:',
                },{
                  validator: this.validateServicePicture
              }
              ],
            })(<Upload {...this.state.Pic}>
                  <Button>
                    <Icon type="upload" />上传图片
                  </Button>
                </Upload>)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="primary" onClick={this.handleReset} style={{ marginLeft: 8 }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ 
      name: 'register',
      
      mapPropsToFields(props) {
        return {
          Name: Form.createFormField({
            ...props.Name,
            Name: props.Name,
          }),
          Type: Form.createFormField({
            
          }),
          Activity: Form.createFormField({
            ...props.Activity,
            Type: props.Activity,
          }),
          Picture: Form.createFormField({
            ...props.Picture,
            Type: props.Picture,
          }),
      }}
    })(RegistrationForm);

  export default WrappedRegistrationForm;


// import React, { useState, useEffect } from "react";
// import "./index.less";
// import { Icon, Button, Tabs, Card, Modal, Form, Upload} from "antd";
// import * as API from "../../../config/api";
// import Loading from "../../../components/loading";
// import { BlockPicker   } from 'react-color';

// const { TabPane } = Tabs;

// const OpenPageContent = (props)=> {
//     const [data, setData] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [confirmLoading, setConfirmLoading] = useState(false);      
//     const [loading, setLoading] = useState(true);
//     const [color, setColor] = useState("black")
//     const [imgUrl1, setImgUrl1] = useState();
//     const [imgUrl2, setImgUrl2] = useState();

//     useEffect(()=>{
//         const params = {
//             page:1,
//             size:10  
//         }
//         API.getAllbootPages(params)
//         .then(async res=> {
//             if(res.data.code === 0) {
//                 await setData(res.data.data);
//                 setLoading(false);
//             }
//         })
//     },[])

//     const handleSubmit = e => {
//         e.preventDefault();
//         props.form.validateFields((err, values) => {
//         if (!err) {
//             console.log('Received values of form: ', values);
//         }
//         });
//     };
//     const normFile = e => {
//         console.log('Upload event:', e);
//         if (Array.isArray(e)) {
//           return e;
//         }
//         return e && e.fileList;
//     };  

//     const { getFieldDecorator } = props.form;

//     const Props = {
//       name: 'image',
//       action: 'http://blog.csxjh.vip:8000/images/upload',
//       headers: {
//         token: "86f3705005b940a0a21f4d948eb0d04f",
//       },
//       onChange(info) {
//           if(info.file.status === "done" && info.file.response.code === 0) {
//               setImgUrl1(info.file.response.data);
//           }
//         }
//     };
//     const Props2 = {
//         name: 'image',
//         action: 'http://blog.csxjh.vip:8000/images/upload',
//         headers: {
//           token: "86f3705005b940a0a21f4d948eb0d04f",
//         },
//         onChange(info) {
//             if(info.file.status === "done" && info.file.response.code === 0) {
//                 setImgUrl2(info.file.response.data);
//             }
//           }
//       };

//     const handleOk =async()=> {
//         setConfirmLoading(true);
//         const openPageData = {
//             upperImage: imgUrl1,
//             bgColor: color,
//             bgImage: imgUrl2
//         }
//         await API.createopenPage(openPageData)
//         .then(res=> {
//             if(res.data.code === 0) {
//                 const newData = [...data];
//                 newData.unshift(openPageData);
//                 setData(newData);
//             }
//         })
//         setColor("black")
//             setConfirmLoading(false);
//             setVisible(false);
//     }
//     const handleCancel = ()=> {
//         setVisible(false);
//     }
//     const handleDelete = (id)=> {
//         API.deleteopenPage({id})
//         .then(res=> {
//             if(res.data.code === 0) {
//                 const newData = [...data].filter(item=>{
//                     return item.id!==id
//                 });
//                 setData(newData);
//             }
//         })
//     }
//     const Content = 
//         <div className = "openPage-pages">
//             <Modal
//             title="新增轮播图"
//             visible={true}
//             confirmLoading={confirmLoading}
//             onOk={handleOk}
//             onCancel={handleCancel}
//             className = "openPage-modal"
//             okText = "确认"
//             cancelText = "取消"
//             >
//                 <div style = {{display: "flex"}}>
//                 <Form onSubmit={handleSubmit} className="openPage-form">
//                     <Form.Item label="悬浮图片" >
//                     {getFieldDecorator('img1', {
//                         valuePropName: 'fileList',
//                         getValueFromEvent: normFile,
//                     })(
//                         <Upload {...Props}>
//                         <Button>
//                           <Icon type="upload" />点击上传
//                         </Button>
//                       </Upload>,
//                     )}
//                     </Form.Item>
//                     <Form.Item label="背景填充" >
//                     {getFieldDecorator('img2', {
//                         valuePropName: 'fileList',
//                         getValueFromEvent: normFile,
//                     })(
//                         <Upload {...Props2}>
//                         <Button>
//                           <Icon type="upload" />点击上传
//                         </Button>
//                       </Upload>,
//                     )}
//                     </Form.Item>
//                     <Form.Item label="选择颜色" >
//                     {getFieldDecorator('color', {
//                         valuePropName: 'color',
//                     })(
//                         <BlockPicker defaultValue = "black"   onChange = {(values)=>{setColor(values.hex)}}  />
//                     )}
//                     </Form.Item>
//                 </Form>
                
//                 <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
//                 </div>
//             </Modal>
//         </div>

//     const emptyConent = 
//         <div>
//             <Card onClick={()=> {setVisible(true)}} hoverable style={{ width: 180, height: 335 }} className = "flex-center">
//                 <div>
//                     <p>您尚未添加任何图片</p>
//                     <Button className = "margin-center"><Icon type = "plus"/>添加图片</Button>
//                 </div>
//             </Card>
//             <Modal
//             title="新增开屏页"
//             visible={visible}
//             confirmLoading={confirmLoading}
//             onOk={handleOk}
//             onCancel={handleCancel}
//             className = "openPage-modal"
//             okText = "确认"
//             cancelText = "取消"
//             >
//                 <div style = {{display: "flex"}}>
//                 <Form onSubmit={handleSubmit} className="openPage-form">
//                     <Form.Item label="悬浮图片" >
//                     {getFieldDecorator('img1', {
//                         valuePropName: 'fileList',
//                         getValueFromEvent: normFile,
//                     })(
//                         <Upload {...Props}>
//                         <Button>
//                           <Icon type="upload" />点击上传
//                         </Button>
//                       </Upload>,
//                     )}
//                     </Form.Item>
//                     <Form.Item label="背景填充" >
//                     {getFieldDecorator('img2', {
//                         valuePropName: 'fileList',
//                         getValueFromEvent: normFile,
//                     })(
//                         <Upload {...Props2}>
//                         <Button>
//                           <Icon type="upload" />点击上传
//                         </Button>
//                       </Upload>,
//                     )}
//                     </Form.Item>
//                     <Form.Item label="选择颜色" >
//                     {getFieldDecorator('color', {
//                         valuePropName: 'color',
//                     })(
//                         <BlockPicker    onChange = {(values)=>{setColor(values.hex)}}  />
//                     )}
//                     </Form.Item>
//                 </Form>
                
//                 <div className = "openPage-preview" style = {{backgroundColor:`${color}`}}></div>
//                 </div>
//             </Modal>
//         </div>

//     if(!data.length) {
//         return (
//             <>
//                 {emptyConent}
//                 <Button onClick = {()=>{setData([1])}}>闭嘴</Button>
//             </>
//         )
//     }
//     else {
//         if(data&&data.length) {
//             return (<>{Content}</>) 
//         }
//         else  return (<>{emptyConent}</>) 

//     }
// }
// const WarpedInput = Form.create({ name: 'openPageInput' })(OpenPageContent);

// const OpenPage = ()=> {

//     const callback = (key)=> {
//         console.log(key);
//     }

//     return (
//         <div>
//             <div className = "title">开屏页</div>
//             <Tabs defaultActiveKey="1" onChange={callback} style = {{minHeight:"400px"}}>
//                 <TabPane tab="设置开屏页" key="1">
//                     {/* <OpenPageContent /> */}
//                     <WarpedInput />
//                 </TabPane>
//             </Tabs>
//             <div className = "warn">还差一个首屏页的状态更改   还有具体的图片叠加效果(等ui图)</div>
//         </div>
//     )
// }

// export default OpenPage;