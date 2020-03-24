import React, { Component } from 'react';
import {Table, Button, Popconfirm} from 'antd';
import './index.less';
import * as API from '../../../config/api';

export default class Manage extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [
                {
                    title: "序号",
                    key: "id",
                    dataIndex:  "id"
                },
                {
                    title: "配置人",
                    key: "schoolName",
                    dataIndex: "schoolName"
                },
                
                {
                    title: "名称",
                    key: "name",
                    dataIndex:  "name"
                },
                {
                    title: "类型",
                    key: "type",
                    dataIndex:  "type"
                },
                {
                    title: "活动ID/图片",
                    key: "content",
                    dataIndex:  "content"
                },
                {
                    title: "操作",
                    key: "operate",
                    dataIndex:  "operate",
                    render:(text, record, index) =>{
                    return (
                        <Button onClick={()=>this.ClickedTable(text)}>
                            <Popconfirm title={`你确定要${text}`} onConfirm={() => this.handleDelete(text,record.id)}>
                            <a>{text}</a>
                            </Popconfirm>
                        </Button>
                    )
                    }
                }
            ],
            dataSource: []
        }
    }
    
    componentWillMount(){
        API.ListShowedCarousels({
            size: "0",
            page: '10'
        }).then(res=>{
            if(res.data.code === 0){
                const data = res.data.data;
                data.forEach(item => {
                    item.operate = item.showed?"下线":"删除"
                });
                data.reverse();
                this.setState({
                    dataSource: data
                },
                console.log("管理页面",res));
            }
        }).catch(()=>{
            console.log("错误");
        })
    }
    render() {
        return (
            <div>
                <div className="manage-head">配置轮播图</div>
                <div className="manage-table">
                    <Table columns={this.state.columns} dataSource={this.state.dataSource} />
                </div>
            </div>
        )
    }
}
