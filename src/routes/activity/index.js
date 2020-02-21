import React, {useState, useEffect} from "react";
import { Tabs, Form, Divider, Button, Modal, Radio, Input, Upload, message, Table, Popconfirm, Icon, Popover, List} from "antd";
import * as API from "../../config/api";

const { TabPane } = Tabs;

const Add = (props)=> {
    const [blockModelLoading, setBlockModelLoading] = useState(false);
	const [blockVisibly, setBlockVisibly] = useState(false);
    const { TextArea } = Input;
    const [data, setData] = useState([]);
    const [imgUrl, setImgUrl] = useState();

    useEffect(()=> {
        const params = {
            size: 10,
            page: 1
        }
        API.getAllActivity(params)
        .then(res=> {
            if(res.data.code === 0) {
                setData(res.data.data);
            }
        })
    },[])

    const Props = {
        name: 'image',
        action: 'http://blog.csxjh.vip:8000/images/upload',
        headers: {
          token: "86f3705005b940a0a21f4d948eb0d04f",
        },
        onChange(info) {
            if(info.file.status === "done" && info.file.response.code === 0) {
                setImgUrl(info.file.response.data);
            }
          }
    };

    const infoContent = (values)=> {
        const data = Object.values(values);
        console.log(data);
        return (
            <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            dataSource={data}
            />
        )
    }


    const handleBlockOk =async ()=> {
		setBlockModelLoading(true);

        await props.form.validateFields((err, values) => {
              if (!err) {
                API.createActive({...values, imgUrl})
                .then(res=> {
                    if(res.data.code === 0) {
                        const id = res.data.data.id;
                        const status = res.data.data.status;
                        const newData =  [...data];
                        newData.unshift({id, ...values, status});
                        setData(newData);
                        setBlockVisibly(false);
                        setBlockModelLoading(false);
                    }
                }).catch(err=> {
                    if(err) {
                        setBlockModelLoading(false);
                    }
                })
              }
          });
        setBlockModelLoading(false);
}
    const handleBlockCancel = ()=> {
		setBlockVisibly(false);
    }

    const deleteActive = (id)=> {
        API.deleteActive({id})
        .then(res=> {
            if(res.data.code === 0) {
                const newdata = [...data].filter(item=> {
                    return item.id!==id
                });
                console.log(newdata);
                setData(newdata);
            }
        })
    }

    const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '当前状态',
          key: 'status',
          dataIndex: 'status',
          render: (text, R) => {
                if(text === 0) {
                    return "未审核"
                }
                else if((text === 3||text ===1)&&!R.failReason) {
                    return "审核未通过"
                }
                else if(text === 4) {
                    return "审核已通过"
                }
          }
		},
		{
			title: '活动id',
			key: 'activeID',
			dataIndex: 'id',
			render: text => "额 还没有"
		// 	<Popconfirm
		// 	title="确定永久封禁当前用户?"
		// 	onConfirm={()=> {apply(text)}}
		// 	onCancel={()=>{}}
		// 	okText= "确认"
		// 	cancelText="取消"
		//   >
		// 	<Button >申请</Button>
		//   </Popconfirm>,
        },
        {
            title: "操作",
            key: 'handle',
            dataIndex: 'id',
            render: (text, R) =>{
                if(R.status === 0) {
                    return (
                        <>
                        <Popconfirm
                        title="确定删除该活动?"
                        onConfirm={()=> {deleteActive(text)}}
                        onCancel={()=>{}}
                        okText= "确认"
                        cancelText="取消"
                        >
                            <Button >删除</Button>
                        </Popconfirm>
                        <Popover 
                        content={<><p>名称: {R.name}</p>
                        <p>简介: {R.profile}</p>
                        <p>链接: {R.link}</p>
                        <p>图片: {R.image}</p>
                        <p>未通过理由: </p>
                        </>}>
                        <Button>查看</Button>
                        </Popover>
                        <Button>提交审核</Button>
                        </>
                    )
                }
                else if((R.status === 3||R.status ===1)&&!R.failReason) {
                    return (
                        <>
                        <Popconfirm
                        title="确定删除该活动?"
                        onConfirm={()=> {deleteActive(text)}}
                        onCancel={()=>{}}
                        okText= "确认"
                        cancelText="取消"
                        >
                            <Button >删除</Button>
                        </Popconfirm>
                        <Popover 
                        content={<><p>名称: {R.name}</p>
                        <p>简介: {R.profile}</p>
                        <p>链接: {R.link}</p>
                        <p>图片: {R.image}</p>
                        <p>未通过理由: </p>
                        </>}>
                        <Button>查看</Button>
                        </Popover>
                        <Button>修改</Button>
                        </> 
                    )
                }
                else if(R.status === 4) {
                    return (
                        <>
                        <Popconfirm
                        title="确定删除该活动?"
                        onConfirm={()=> {deleteActive(text)}}
                        onCancel={()=>{}}
                        okText= "确认"
                        cancelText="取消"
                        >
                            <Button >删除</Button>
                        </Popconfirm>
                        <Popover 
                        content={<><p>名称: {R.name}</p>
                        <p>简介: {R.profile}</p>
                        <p>链接: {R.link}</p>
                        <p>图片: {R.image}</p>
                        <p>未通过理由: </p>
                        </>}>
                        <Button>查看</Button>
                        </Popover>
                        </> 
                    )
                }


            }

          },
    ];




    const {getFieldDecorator} = props.form;
    return (
        <>
        <div className = "title-text">活动</div>
        <p>近享官方团队和高校管理员均通过“活动”的方式，使用户打开外部链接。</p>
        <p>活动过审后将获取一个活动ID，将此活动ID插入热门搜索或轮播图中，本校用户即可通过点击来打开外部链接。</p>
        <Divider />
        <div className = "title-text">自定义活动</div>
        <p style = {{display: "inline-block"}}>您的活动需符合《近享高校公约》，若有违反，近享团队有权给予不通过，或直接下线您的活动。</p>
        <Button type = "primary" onClick = {()=> {setBlockVisibly(true)}}>新增</Button>
        <Table columns = {columns} dataSource = {data} />
        <div className = "warn">数据不足 查看功能搁浅</div>
        <div className = "warn">状态码没懂 新增确认搁浅</div>
        <div className = "warn">状态码没懂 审核搁浅</div>
        <div className = "warn">活动被我删没了 但是删除功能是好使的</div>
        <Modal
            title="请选择封禁时长"
            visible={blockVisibly}
            confirmLoading={blockModelLoading}
            onOk={handleBlockOk}
            onCancel={handleBlockCancel}
            className = "openPage-modal"
            okText = "确认"
            cancelText = "取消"
        >
            <Form>
                <Form.Item >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入活动名称' }],
                })(
                    <Input
                    placeholder="活动名称"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('profile', {
                    rules: [{ required: true, message: '请输入理由', },{max:40, message: "不超过40字"}],
                })(
                    <TextArea  placeholder = "请输入理由" autoSize = {true}/>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('link', {
                    rules: [{ required: true, message: '请输入页面链接' }],
                })(
                    <Input
                    placeholder="页面链接"
                    />,
                )}
                </Form.Item>       
                <Form.Item>
                    {getFieldDecorator('keyword', {
                        rules: [{ required: true, message: '请输入关键词' }],
                    })(
                        <Input
                        placeholder="关键词"
                        />,
                    )}
                </Form.Item>
            </Form>
            <Upload {...Props}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        </Modal>
        </>
    )
}




const Manage = ()=> {
    const [data, setData] = useState([]);

    useEffect(()=> {
        const params = {
            size: 10,
            page: 1
        }
        API.getAllActivity(params)
        .then(res=> {
            if(res.data.code === 0) {
                setData(res.data.data);
            }
        })
    },[])

	const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '当前状态',
          key: 'status',
          dataIndex: 'status',
          render: text => text
		},
		{
			title: '活动id',
			key: 'activeID',
			dataIndex: 'id',
			render: text => "额 还没有"
		// 	<Popconfirm
		// 	title="确定永久封禁当前用户?"
		// 	onConfirm={()=> {apply(text)}}
		// 	onCancel={()=>{}}
		// 	okText= "确认"
		// 	cancelText="取消"
		//   >
		// 	<Button >申请</Button>
		//   </Popconfirm>,
        },
        {
            title: "操作",
            key: 'status',
            dataIndex: 'status',
            render: (text, R) => <Button>查看</Button>
          },
    ];

    return (
        <>
        <div className = "title-text">管理活动</div>
        <Table columns = {columns} dataSource = {data} />
        <div className = "warn">接口数据不足  查看功能搁浅</div>
        </>
    )
}

const WarppedAdd = Form.create()(Add);
const WarppedManage = Form.create()(Manage);

const Activity = ()=> {
    return (
        <div>
            <div className = "title">活动管理</div>
            <Tabs defaultActiveKey="1" style = {{minHeight:"400px"}}>
                <TabPane tab="添加活动" key="1">
                    <WarppedAdd />
                </TabPane>
                <TabPane tab="管理活动" key="2">
                    <WarppedManage />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Activity;