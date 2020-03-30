import React from 'react';
import { Button, Table, Carousel, Popconfirm, message } from 'antd';
import './index.less';
import Forms from './form';
import * as API from '../../../config/api';

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
                        <Button>
                            <Popconfirm title={`你确定要${text}`} onConfirm={() => this.handleDelete(text,record.id)}>
                            <a>{text}</a>
                            </Popconfirm>
                        </Button>
                    )
                    }
                },
                {
                    title: "",
                    key: "delete",
                    dataIndex:  "delete",
                    render:(text, record, index) =>{
                    return (
                        <Button>
                            <Popconfirm title={`你确定要删除`} onConfirm={() => this.handleDelete(text,record.id)}>
                            <a>删除</a>
                            </Popconfirm>
                        </Button>
                    )
                    }
                }
            ], 

            // dataSource是从后端返回的图片信息
            dataSource: [],
            Pic: [],
            newdataSource: {}
        }
        this.ChangeInput = this.ChangeInput.bind(this);
        this.ClickedForms = this.ClickedForms.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.Create = this.Create.bind(this);
        this.Add = this.Add.bind(this);
    }

    params1 = {
        page:1,
        size:10  
    }
    componentDidMount(){
        // this.Create();
        API.ListSchoolCarousels(this.params1).then(res=>{
            this.Create(res);
        });
        API.listFgCarousels({
            schoolId: '1'
        }).then(res=>{
            if(res.data.code === 0){
                const data = res.data.data;
                this.setState({
                    Pic: data
                })
            }
            console.log(this.state.Pic)
            
        }).catch(()=>{
            console.log('错误')
        })
    }

    Create(res){
            if(res.data.code === 0) {
                const Data = res.data.data;
                Data.forEach(item=>{
                    item.states = item.showed?"当前":"历史";
                    item.num = item.id;
                    item.key = item.id;
                    item.name = item.name;
                    item.ID = item.type==="活动"?item.content:"";
                    item.picture = item.type==="图片"?item.content:"";
                    item.operate = item.showed?"下线":"上线";
                    item.delete = "删除"
                })
                this.setState({
                    dataSource: Data
                })
            }
    }

    Add(data, id){
            const Data = {
                id: id,
                type: data.type,
                states: "历史",
                content: data.content,
                showed: false,
                num: id,
                key: id,
                name: data.name,
                ID: data.type==="活动"?data.content:"",
                picture: data.type==="图片"?data.content:"",
                operate: "上线",
                delete: "删除"
            }
            const dataSource = this.state.dataSource;
            dataSource.reverse();
            const newdataSource = dataSource.concat(Data);
            newdataSource.reverse();

            this.setState({
                dataSource: newdataSource
            },()=>{
                console.log(this.state.dataSource)
            })
    }

    ChangeInput(e){
        this.fields.name = e.target.value;
    }

    handleDelete = (text, id) => {
        if(text === "删除"){
            API.deleteCarousels({
                id: id
            }).then(res=>{
                if(res.data.code === 0) {
                    this.setState({
                        dataSource: this.state.dataSource.filter(item=>
                            item.id !== id)
                    });
                }
            })    
        }else if(text === "下线"){
            API.updateShowedCarousels({
                id: id,
                showed: false
            }).then(res=>{
                if(res.data.code === 0){
                    const dataSource = this.state.dataSource;
                    this.setState({
                        dataSource: dataSource.map((item, index)=>
                            item.id===id?{...item, states: "历史", operate: "上线", showed: false}:item
                        )
                    },()=> console.log(this.state.dataSource))
                }
                
            })
        }else if(text === "上线"){
            API.updateShowedCarousels({
                id: id,
                showed: true
            }).then(res=>{
                if(res.data.code === 0){
                    const dataSource = this.state.dataSource;
                    this.setState({
                        dataSource: dataSource.map((item, index)=>
                            item.id===id?{...item, states: "当前", operate: "下线", showed: true}:item
                        )
                    },()=> console.log(this.state.dataSource))
                }
            })
        }
    };

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
                <div className="carousels" style={{marginTop: 20}}>轮播图预览</div>
                <div className="carousels-show">
                    <Carousel className="carousels-show-carousels">
                        {this.state.Pic.map((item, index)=>{
                            return(
                                <div><img src={item.link} key={index} /></div>
                            )
                        })}
                    </Carousel>
                </div>
                
                <div className={this.state.Show?"carousels-form":"Hidden"} >
                    <Forms handleCancel={this.handleCancel} params={this.params1} Add={this.Add}/>
                </div>
                
            </div>
        )
    }
}
