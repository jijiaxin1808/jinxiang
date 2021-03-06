import React, { useState, useEffect } from "react";
import "./index.less";
import { Button, Tabs, Modal, Input, Table, Divider, Radio, Form } from "antd";
import * as API from "../../config/api";
import * as session from "../../utils/session";

const { TabPane } = Tabs;

const Add = ()=> {

	const [visible, setVisible] = useState(false); // modal是否可见
	const [confirmLoading, setConfirmLoading] = useState(false);   //  modal确认按钮是否loading
	const [data, setData] = useState([]);  //  表格使用的数据
	const [addDisable, setAddDisbale] = useState(false);
    const [inputType, setInputType] = useState();
    const [form] = Form.useForm();

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
    },[]) // 初始化
	
	useEffect(()=> {	
		if(!addDisable && data.length && data.filter(item => item.showed === true).length) {
            setAddDisbale(true);
            setVisible(false);
		}
		else if(addDisable&&!data.filter(item => item.showed === true).length) {
            setAddDisbale(false);
            setVisible(false);
        }
	},[data]) //  控制上线按钮的状态


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
    }//  删除搜索
    
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
        form.validateFields()
        .then(values => {
            setConfirmLoading(true);
            const {name, type, content} = values;
            const newdata = {name, type, content}
            API.topSearchCreate(newdata)
            .then(res=> {
                if(res.data.code === 0) {
                    let newData = [...data]
                    newData.unshift({id:res.data.data,...newdata,showed:true});
                    setData(newData);
                    setVisible(false);
                    setConfirmLoading(false);
                }
            })
        })
    }

    const handleCancel = ()=> {
        setVisible(false);
        setConfirmLoading(false);
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
                <Form form = {form}>
                    <Form.Item label = "名称" name = "name" rules = {[{ required: true, message: '请输入热门搜索名称' }]} >
                       <Input placeholder = "请输入热门搜索名称" />
                    </Form.Item>
					<Form.Item label="类型" name = "type">
                        <Radio.Group  buttonStyle="solid" 
                        onChange = {(e)=> {e.target.value==="活动"?setInputType(/^[0-9]\d*$/):setInputType("")}}
                        >
							<Radio.Button value="关键词" key = {1}>关键词</Radio.Button>
							<Radio.Button value="活动" key = {2}>活动</Radio.Button>
						</Radio.Group>
                    </Form.Item>
                    <Form.Item label = {inputType?"活动id":"关键词"} name = "content"
                    rules = {[{ required: true, message: '请输入内容'}, 
                    {pattern: inputType, message:"请输入数字ID"}]}>
                       <Input placeholder = {inputType?"活动id":"关键词"} />
                    </Form.Item>
                </Form>
                </div>
            </Modal>
            <Table columns={columns} dataSource={data} className = "hotSearch-table-add" />
        </div>
    );
}




const Manage = ()=> {

	const [goodsData, setGoodsData] = useState([]);
    const [handleData, setHandleData] = useState([]);

	useEffect(()=> {
        const params = {
            page: 1,
            size: 10
        }
		API.getGooodstopSearch()
		.then(res=> {
			if(res.data.code === 0) {
				setGoodsData(res.data.data);
			}
        })
        API.getShowedTopSearch(params)
        .then(res=> {
            if(res.data.code === 0) {
                setHandleData(res.data.data);
            }
        })
	},[])

	const userDelete = (id)=> {
		API.deleteGoodsTopSearch({id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...goodsData].filter(item=>item.id!==id);
				setGoodsData(newData);
			}
		})
    }

    const deleteSearch = (id)=> {
		API.deletetopSearch({id})
		.then(res=> {
			if(res.data.code === 0) {
				const newData = [...handleData].filter(item=> {
					return item.id!==id;
				})
				setHandleData(newData);
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
            render: (text, R) => <Button onClick = {()=>{userDelete(R.id)}}>下线</Button>,
        },
    ];
      
  
    const handleColumns = [
        {
          title: '序号',
		  dataIndex: 'id',
		  key:"id",
          render: text => text
        },
        {
          title: '显示范围',
		  dataIndex: 'schoolName',
		  key: "Aid",
          render: text => text
        },
        {
            title: '类型',
			dataIndex: 'type',
			key: "type",
            render: text => text
        },
        {
            title: '活动id/关键词',
			dataIndex: 'content',
			key:"e",
            render: text => text
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: "handle",
            render: text => <Button onClick = {()=>deleteSearch(text)}>下线</Button>
          },
      ];
    return (
        <div>
            <p className = "title-text">用户热门搜索</p>
            <div className = "hotSearch-div-userSearch">
                <Table columns={userColumns} dataSource = {goodsData}  pagination = {false} />
            </div>
            <p className = "title-text">配置热门搜索</p>
            <Table columns={handleColumns} dataSource={handleData}/>
        </div>
    )
}




const HotSearch = ()=> {
    return (
        <div>
            <div className = "title">热门搜索</div>
            <Tabs defaultActiveKey="1"  style = {{minHeight:"400px"}}>
                <TabPane tab="添加热门搜索" key="1">
                    <Add />
                    {/* <div className = "warn">用户热门搜索删除后更新莫得</div> */}
                </TabPane>
                {
                    session.getLevelA()?
                    <TabPane tab="管理热门搜索" key="2">
                        <Manage />
                    </TabPane>:""
                }
            </Tabs>
        </div>
    )
}

export default HotSearch;