import React from 'react';
import { Form, Input, Select, Button, Icon, Upload,message } from 'antd';
import './index.less';
import * as API from '../../../../config/api';
  
  const { Option } = Select;

  class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // confirmDirty: false,
            types: '',
            Name: "",
            Activity: "",
            Picture: ""
          };
    }

    Pic = {
      name: 'image',
      action: 'http://blog.csxjh.vip:8000/images/upload',
      headers: {
        token: "86f3705005b940a0a21f4d948eb0d04f",
      },
      showUploadList : true,
      onChange(info) {
          if(info.file.status === "done" && info.file.response.code === 0) {
            this.data.MakePicture(info.file.response.data)      
          }
        }
    }
    
    MakePicture = (Pic) =>{
      this.setState({
        Picture: Pic
      })
    }

    handleSubmit = e => {
      e.preventDefault();
      let standard = true;
      if(this.state.Name === ''){
          message.error("请填写名称");
          standard = false;
      }
      if(this.state.types === ''){
        message.error("请选择类型");
          standard = false;
      }
      
      if(this.state.types === "activity"){
        if(this.state.Activity === ''){
          message.error("请填写活动ID");
            standard = false;
        }
      }
      if(this.state.types === "picture"){
        if(this.state.Picture === ''){
            message.error("请上传图片", 3);
            standard = false;
        } 
      }
      if(standard){
        const Message = {
          name: this.state.Name,
          type: this.state.types==="activity"?"活动":"图片",
          content: this.state.types==="activity"? this.state.Activity: this.state.Picture
        }
        API.createCarousels(Message).then((res)=>{
          if(res.data.code === 0){
            this.props.Add(Message, res.data.data);
          }
          
        });
        this.handleReset();
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


    render() {
      const { getFieldDecorator } = this.props.form;
  
      return (
        <Form onFinish={this.handleSubmit}>
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
            })(<Input placeholder="请填写名称"/>)}
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
                }
              ],
            })(<Upload {...this.Pic} data={ {MakePicture: this.MakePicture}}>
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
  
  // const WrappedRegistrationForm = Form.create({ 
  //     name: 'register',
      
  //     mapPropsToFields(props) {
  //       return {
  //         Name: Form.createFormField({
  //           ...props.Name,
  //           Name: props.Name,
  //         }),
  //         Type: Form.createFormField({
            
  //         }),
  //         Activity: Form.createFormField({
  //           ...props.Activity,
  //           Type: props.Activity,
  //         }),
  //         Picture: Form.createFormField({
  //           ...props.Picture,
  //           Type: props.Picture,
  //         }),
  //     }}
  //   })(RegistrationForm);

  export default RegistrationForm;

