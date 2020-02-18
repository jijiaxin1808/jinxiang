import React, { useState, useEffect } from "react";
import "./index.less";
import { Button, Tabs, Modal, Form, Input, Table, Divider, Radio} from "antd";
import * as API from "../../config/api";


const { TabPane } = Tabs;

const Add = (props)=> {

	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);  
	const [data, setData] = useState([]);
	const [addDisable, setAddDisbale] = useState(false);

	const { getFieldDecorator, getFieldsValue } = props.form;

    useEffect(()=>{
        const params = {
            page:1,
            size:10  
        }
        API.getAlltopSearch(params)
        .then(async res=> {
            if(res.data.code === 0) {
            setData(res.data.data);
            }
        })
    },[])
	
	useEffect(()=> {	
		if(!addDisable && data.length && data.filter(item => item.showed === true)) {
			setAddDisbale(true);
		}
		else {
		setAddDisbale(false);
		}
	},[data])


	const deleteSearch = (id)=> {
		API.deletetopSearch({id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...data].filter(item=> {
					return item.id!==id;
				})
				setData(newData);
			}
		})
	}
	const cancel = (id)=> {
		const params = {
			id: id,
			showed: false
		}
		API.updatetopSearch(params)
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...data].map(item=> {
					if(item.id === id) {
						return {...item,showed:false}
					}
					return item
				})
				setData(newData);
			}
		})
	}

    const handleOk =async ()=> {
		setConfirmLoading(true);
		const {name, type} = getFieldsValue();
		const newdata = {name, type, content:"书"}
		await API.topSearchCreate(newdata).then(res=> {
			if(res.data.code === 0) {
				let newData = [...data]
				newData.unshift(res.data.data);
				setData(newData);
				setVisible(false);
				setConfirmLoading(false);
			}
		})
    }
    const handleCancel = ()=> {
        setVisible(false);
    }

	const columns = [
		{
		  title: '状态',
		  dataIndex: 'showed',
		  key: "showed",
		  render: text => text?"当前":"历史",
		},
		{
		  title: '序号',
		  dataIndex: 'id',
		  key: "id",
		  render: text => text
		},
		{
		  title: '名称',
		  dataIndex: 'name',
		  key: "name",
		  render: text => text
		},
		{
            title: '关键词',
			dataIndex: 'type',
			key:"e",
            render: (text, R) => text==="活动"?"":R.content

		},
		{
            title: '活动',
			dataIndex: 'type',
			key:"a",
            render: (text, R) => text==="活动"?R.content:""
        },
		{
			title: '操作',
			dataIndex: 'showed',
			key: "handle",
			render: (text, record) => text?<Button onClick = {()=> {cancel(record.id)}}>下线</Button>:
			<Button onClick = {()=>{deleteSearch(record.id)}}>删除</Button>,
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
			<Button type = "primary" className = "hotSearch-button-add" 
			onClick = {()=> {setVisible(true)}} disabled = {addDisable}>
				新增
			</Button>
			<Modal
            title="新增热门搜索"
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            className = "openPage-modal"
            okText = "确认"
            cancelText = "取消"
            >
                <div>
                <Form  >
                    <Form.Item label="名称" >
                    {getFieldDecorator('name', {
						valuePropName: 'input',
						rules: [{ required: true, message: '请输入热门搜索名称' }]
                    })(
                       <Input placeholder = "请输入热门搜索名称" />
                    )}
                    </Form.Item>
					<Form.Item label="类型" >
                    {getFieldDecorator('type', {
						valuePropName: 'radio-button',
						defaultValue: "keyWord"
                    })(
						<Radio.Group  buttonStyle="solid">
							<Radio.Button value="关键词" key = {1}>关键词</Radio.Button>
							<Radio.Button value="活动" key = {2}>活动</Radio.Button>
						</Radio.Group>
                    )}
                    </Form.Item>
                </Form>
                </div>
            </Modal>
			
            <Table columns={columns} dataSource={data} className = "hotSearch-table-add" />
        </div>
    )
}




const WarppedAdd = Form.create()(Add);

const Manage = ()=> {

	const [goodsData, setGoodsData] = useState([]);

	useEffect(()=> {
		API.getGooodstopSearch()
		.then(res=> {
			if(res.data.code === 0) {
				setGoodsData(res.data.data);
			}
		})
	},[])

	const userDelete = (id)=> {
		API.deleteGoodsTopSearch({id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...goodsData];
				newData.filter(item=>item.id!==id);
				setGoodsData(newData);
			}
		})
	}


    const userColumns = [
        {
          title: '序号',
		  dataIndex: 'id',
		  key:"id",
          render: text => text
        },
        {
          title: '热门搜索',
		  dataIndex: 'name',
		  key:"name",
          render: text => text
        },
        {
          title: '搜索量',
		  dataIndex: 'freq',
		  key: "freq",
          render: text => text
        },
        {
            title: '操作',
            dataIndex: 'status',
            key: "handle",
            render: text => <Button onClick = {()=>{userDelete(text)}}>下线</Button>,
        },
    ];
      

    
    const handleColumns = [
        {
          title: '状态',
          dataIndex: 'status',
          key: "status",
          render: text => text?"当前":"历史",
        },
        {
          title: '序号',
		  dataIndex: 'id',
		  key:"id",
          render: text => text
        },
        {
          title: '配置人',
		  dataIndex: 'name',
		  key: "name",
          render: text => text
        },
        {
          title: '显示范围',
		  dataIndex: 'Aid',
		  key: "Aid",
          render: text => text
        },
        {
            title: '类型',
			dataIndex: 'keyWord',
			key: "keyWord",
            render: text => text
        },
        {
            title: '活动id/关键词',
			dataIndex: 'keyWord',
			key:"e",
            render: text => text
        },
        {
            title: '操作',
            dataIndex: 'status',
            key: "handle",
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
                <Table columns={userColumns} dataSource={goodsData} className = "hotSearch-table-userSearch" pagination = {false} />
                <Table columns={userColumns} dataSource={goodsData} className = "hotSearch-table-userSearch" pagination = {false}/>
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
                    <WarppedAdd />
					<div className = 'warn'>下线商品热搜接口有问题</div>
					<div className = 'warn'>新增热搜的实时查询确认没有写</div>
					<div className = 'warn'>商品热门搜索的数量不够</div>
					<div className = 'warn'>全部热门搜索的接口</div>
                </TabPane>
                <TabPane tab="管理热门搜索" key="2">
                    <Manage />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default HotSearch;