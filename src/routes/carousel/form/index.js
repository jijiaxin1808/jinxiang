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
      }else{
        Message = {
          ...Message,
          "name": this.state.Name
        }
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
        // console.log(Message);
        API.createCarousels({
          "type": "图片",
          "name": "过大年",
          "content": "124.png"
      }).then(()=>{
          this.props.Create(this.props.params);
        })
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

