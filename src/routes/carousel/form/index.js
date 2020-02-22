import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import Picture from './picture';
import './index.less';
  
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
             
          };
    }
  
    handleSubmit = e => {
      e.preventDefault();
      console.log('Received values of form: ', this.state);
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    handleReset = () => {
        // this.props.form.resetFields();
        // this.setState({
        //     types: ''
        // });
        // this.handleRefresh();
        window.location.reload();
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
      console.log(value);
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
            })(<Picture />)}
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