import React from 'react';
import { Button, Table, Carousel, Popconfirm, Input, Select } from 'antd';
import './index.less';
import Forms from './form';
import * as API from '../../config/api';

export default class Carousels extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Show: false,
            columns: [
                {
                    title: "状态",
                    dataIndex: "states",
                    key: "state"
                },
                {
                    title: "序号",
                    key: "num",
                    dataIndex:  "num"
                },
                {
                    title: "名称",
                    key: "name",
                    dataIndex:  "name"
                },
                {
                    title: "活动ID",
                    key: "ID",
                    dataIndex:  "ID"
                },
                {
                    title: "图片",
                    key: "picture",
                    dataIndex:  "picture"
                },
                {
                    title: "操作",
                    key: "operate",
                    dataIndex:  "operate",
                    render:(text, record, index) =>{
                    return (
                        <Button onClick={()=>this.ClickedTable(text)}>
                            <Popconfirm title={`你确定要${text}`} onConfirm={() => this.handleDelete(record.id)}>
                            <a>{text}</a>
                            </Popconfirm>
                        </Button>
                    )
                    }
                }
            ],

            // dataSource是从后端返回的图片信息
            dataSource: [],
        }
        this.ClickedButton = this.ClickedButton.bind(this);
        this.ClickedTable = this.ClickedTable.bind(this);
        this.ChangeInput = this.ChangeInput.bind(this);
        this.SubmitDate = this.SubmitDate.bind(this);
        this.ClickedForms = this.ClickedForms.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.Create = this.Create.bind(this);
    }

    params1 = {
        page:1,
        size:10  
    }
    componentDidMount(){
        this.Create();
    }

    Create(){
        API.ListAllCarousels(this.params1).then(res=>{
            if(res.data.code === 0) {
                const Data = res.data.data;
                Data.forEach(item=>{
                    item.states = item.showed?"当前":"历史";
                    item.num = item.id;
                    item.name = item.name;
                    item.ID = item.type==="活动"?item.content:"";
                    item.picture = item.type==="图片"?item.content:"";
                    item.operate = item.showedz?"下线":"删除";
                })
                console.log(Data)
                this.setState({
                    dataSource: Data
                })
            }
        })
    }

    ChangeInput(e){
        this.fields.name = e.target.value;
    }

    ChangeSelect(e){
        if(e==="activity"){
            this.setState({ types: 'activity' })
        }else if(e==="picture"){
            this.setState({types: 'picture'})
        }else{
            this.setState({types: ''})
        }
    }
    
    getDate(type, ActPic){
        if(type === 'activity'){
            this.fields.ID = ActPic
        }else if(type === 'picture'){
            this.fields.picture = ActPic
        }
        
    }

    SubmitDate(){
        this.setState({
            fields: {...this.fields}
        })
    }
    ClickedButton(){
        const dataSource = [...this.state.dataSource];
        this.setState({dataSource:dataSource.unshift({

        })})
    }
    ClickedTable(e){
    }
    handleDelete = (id) => {
        API.deleteCarousels({
            id: id
        }).then(res=>{
            if(res.data.code === 0) {
                const Data = res.data.data;
                Data.forEach(item=>{
                    item.states = item.showed?"当前":"历史";
                    item.num = item.id;
                    item.name = "Data.name";
                    item.ID = item.type==="活动"?item.content:"";
                    item.picture = item.type==="图片"?item.content:"";
                    item.operate = item.showedz?"下线":"删除";
                    item.key = item.id;
                })
                console.log("Data", Data)
                this.setState({
                    dataSource: Data
                })
            }
        })
    };
    
    // 点击新填后，表单出现
    ClickedForms(){
          this.setState({
            Show: true
          })
      }
    
    handleCancel(){
        this.setState({
            Show: false
        })
    }

    render(){
        return (
            <div className='carousels'>
                自定义轮播图
                <div className="carousels-head">
                    <div className="carousels-head-left">
                        自定义轮播图可以是活动,也可以是图片，二者择一。<br/>
                        若是活动，请填写已过审的活动ID，用户点击该轮播图跳转该活动页面;若图片不可以点击。
                    </div>
                    <div className="carousels-head-right">
                    <Button type="primary" onClick={this.ClickedForms}>新增</Button>
                    </div>
                </div>
                <div>
                    <Table columns={this.state.columns} dataSource={this.state.dataSource} />
                </div>
                <div className="carousels-show">
                <Carousel>
                    {this.state.dataSource.map((item, index)=>{
                        return(
                            <div>
                                {/* <img src={this.state.dataSource.} */}
                            </div>
                        )
                    })}
                </Carousel>
                </div>
                <div className={this.state.Show?"carousels-form":"Hidden"} >
                    <Forms handleCancel={this.handleCancel} params={this.params1} Create={this.Create}/>
                </div>
                
            </div>
        )
    }
}
