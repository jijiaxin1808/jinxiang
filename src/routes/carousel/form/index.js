import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import Picture from './picture';
import './index.less';
  
  const { Option } = Select;

  class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            types: '',
            fields:{
                Name: "",
                Activity: "",
                Picture: "",
             }
          };
    }
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', this.state);
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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


    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('名称', {
              rules: [
                {
                  type: 'Name',
                  message: '请输入名称',
                },
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(<Input placeholder="请填写名称" />)}
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
                  type: 'Activity:',
                  message: '请输入活动ID:',
                },
                {
                  required: true,
                  message: '请输入活动ID:',
                },
              ],
            })(<Input placeholder="请填写活动ＩＤ"/>)}
          </Form.Item>
          <Form.Item label="图片:" className={this.state.types==="picture"?'':'Hidden'}>
            {getFieldDecorator('Picture:', {
              rules: [
                {
                  type: 'Picture',
                  message: '请输入图片:',
                },
                {
                  required: true,
                  message: '请输入图片:',
                },
              ],
            })(<Picture />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button type="primary" htmlType="reset" style={{ marginLeft: 8 }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ 
      name: 'register',
      onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
      },
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