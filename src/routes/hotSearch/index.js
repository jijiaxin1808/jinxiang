import React, { useState, useEffect } from "react";
import "./index.less";
import { Divider, Tabs, Button, Tag, Table} from "antd";




const { TabPane } = Tabs;

const Add = ()=> {

    const columns = [
        {
          title: '状态',
          dataIndex: 'status',
          key: "id",
          render: text => text?"当前":"历史",
        },
        {
          title: '序号',
          dataIndex: 'id',
          render: text => text
        },
        {
          title: '名称',
          dataIndex: 'name',
          render: text => text
        },
        {
          title: '活动ID',
          dataIndex: 'Aid',
          render: text => text
        },
        {
            title: '关键词',
            dataIndex: 'keyWord',
            render: text => text
        },
        {
            title: '操作',
            dataIndex: 'status',
            key: "id",
            render: text => text?<Button>下线</Button>:<Button>删除</Button>,
          },
      ];
      
      const data = [
        {
          id: '1',
          status: true,
          name: 32,
          Aid: 'New York No. 1 Lake Park',
          keyWord: 'nice'
        },
        {
          id: '2',
          status: false,
          name: 42,
          Aid: 'London No. 1 Lake Park',
          keyWord: 'loser'
        },
        {
          id: '3',
          status: true,
          name: 32,
          Aid: 'Sidney No. 1 Lake Park',
          keyWord: 'cool'
        },
      ];

    return (
        <div>
            <p className = "title-text">热门搜索</p>
            <p>热门搜索默认自动抓取过去24小时内，全部用户搜索量最高的10个关键词。</p>
            <p>近享官方团队和高校管理员在同一时间内，各自可以自定义一个热门搜索。官方团队设置的热门搜索对全部用户展示，高校管理员设置的只对本校展示。</p>
            <Divider />
            <p className = "title-text">自定义热门搜索</p>
            <p>自定义热门搜索可以是活动，也可以是关键词，二者择一。</p>
            <p style = {{display: "inline-block"}}>若是活动请填写已过审的活动ID，用户点击该关键词将跳转活动页面；若是关键词，请填写关键词，用户点击将自动搜索该词汇。</p>
            <Button type = "primary" className = "hotSearch-button-add">新增</Button>
            <Table columns={columns} dataSource={data} className = "hotSearch-table-add" />
        </div>
    )
}


const Manage = ()=> {

    const userColumns = [
        {
          title: '序号',
          dataIndex: 'id',
          render: text => text
        },
        {
          title: '热门搜索',
          dataIndex: 'name',
          render: text => text
        },
        {
          title: '搜索量',
          dataIndex: 'number',
          render: text => text
        },
        {
            title: '操作',
            dataIndex: 'status',
            key: "id",
            render: text => <Button>下线</Button>,
          },
    ];
      
    const userData = [
        {
          id: '1',
          name: 32,
          number: 2312,
        },
        {
          id: '2',
          name: 42,
          number: 312321,
        },
        {
          id: '3',
          name: 32,
          number: 321321312
        },
    ];
    
    const handleColumns = [
        {
          title: '状态',
          dataIndex: 'status',
          key: "id",
          render: text => text?"当前":"历史",
        },
        {
          title: '序号',
          dataIndex: 'id',
          render: text => text
        },
        {
          title: '配置人',
          dataIndex: 'name',
          render: text => text
        },
        {
          title: '显示范围',
          dataIndex: 'Aid',
          render: text => text
        },
        {
            title: '类型',
            dataIndex: 'keyWord',
            render: text => text
        },
        {
            title: '活动id/关键词',
            dataIndex: 'keyWord',
            render: text => text
        },
        {
            title: '操作',
            dataIndex: 'status',
            key: "id",
            render: text => <Button>下线</Button>
          },
      ];
      
      const handleData = [
        {
          id: '1',
          status: true,
          name: 32,
          Aid: 'New York No. 1 Lake Park',
          keyWord: 'nice'
        },
        {
          id: '2',
          status: false,
          name: 42,
          Aid: 'London No. 1 Lake Park',
          keyWord: 'loser'
        },
        {
          id: '3',
          status: true,
          name: 32,
          Aid: 'Sidney No. 1 Lake Park',
          keyWord: 'cool'
        },
      ];




    return (
        <div>
            <p className = "title-text">用户热门搜索</p>
            <div className = "hotSearch-div-userSearch">
                <Table columns={userColumns} dataSource={userData} className = "hotSearch-table-userSearch" pagination = {false} />
                <Table columns={userColumns} dataSource={userData} className = "hotSearch-table-userSearch" pagination = {false}/>
            </div>
            <p className = "title-text">配置热门搜索</p>
            <Table columns={handleColumns} dataSource={handleData}/>
        </div>
    )
}




const HotSearch = ()=> {

    const callback = (key)=> {
        console.log(key);
    }

    return (
        <div>
            <div className = "title">热门搜索</div>
            <Tabs defaultActiveKey="1" onChange={callback} style = {{minHeight:"400px"}}>
                <TabPane tab="添加热门搜索" key="1">
                    <Add />
                </TabPane>
                <TabPane tab="管理热门搜索" key="2">
                    <Manage />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default HotSearch;