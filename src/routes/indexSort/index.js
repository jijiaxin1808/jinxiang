import React from "react";
import "./index.less";
import { Table, Button } from "antd";









  









const IndexSort = ()=> {

    const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '分类',
          dataIndex: 'sort',
          key: 'id',
        },
        {
          title: 'icon',
          dataIndex: 'icon',
          key: 'id',
        },
        {
          title: '操作',
          key: 'id',
          dataIndex: "id",
          render: text => <Button>修改</Button>
        }
      ];
      
      const data = [
        {
          id: '1',
          sort: 'John Brown',
          age: 32,
          icon: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          id: '2',
          sort: 'Jim Green',
          age: 42,
          icon: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          id: '3',
          sort: 'Joe Black',
          age: 32,
          icon: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <>
        <div className = "title">首页分类</div>
        <p className = "title-text">主分页</p>
        <Table columns={columns} dataSource={data} />
        </>
    )

}
export default IndexSort;