import React, {useState, useEffect} from "react";
import { Tabs, Form, Divider, Button, Modal, Radio, Input, Upload, message, Table, Popconfirm } from "antd";
import * as API from "../../config/api";

const { TabPane } = Tabs;

const Add = (props)=> {
    const [blockModelLoading, setBlockModelLoading] = useState(false);
	const [blockVisibly, setBlockVisibly] = useState(false);
    const [RadioValue, setRadioValue] = useState();
    const { TextArea } = Input;
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


    const handleBlockOk =async ()=> {
		setBlockModelLoading(true);

		// const newdata = {
		// 	userId: blockId,
		// 	blockDays: blockTime
		// }
		// await API.blockUser(newdata)
		// .then(res=> {
		// 	if(res.data.code === 0) {

		// 	}
		// })
		setBlockVisibly(false);
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
            key: 'handle',
            dataIndex: 'id',
            render: (text, R) =>
                <Popconfirm
                title="确定删除该活动?"
                onConfirm={()=> {deleteActive(text)}}
                onCancel={()=>{}}
                okText= "确认"
                cancelText="取消"
              >
                <Button >删除</Button>
              </Popconfirm>
          },
    ];




    const {getFieldDecorator} = props.form
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
                {getFieldDecorator('reason', {
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
                {getFieldDecorator('radio-group', {
                    rules: [{ required: true, message: '请选择类型' }],

                })(
                    <Radio.Group defaultValue="图片" buttonStyle="solid" onChange = {(e)=> {setRadioValue(e.target.value); }} >
                        <Radio.Button value="关键字">关键字</Radio.Button>
                        <Radio.Button value="图片">图片</Radio.Button>
                    </Radio.Group>
                )}
                </Form.Item>
                {RadioValue==="关键字"?          
                <Form.Item>
                    {getFieldDecorator('link', {
                        rules: [{ required: true, message: '请输入关键词' }],
                    })(
                        <Input
                        placeholder="关键词"
                        />,
                    )}
                </Form.Item>:
                <Form.Item>
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                //   getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>
                        点击上传图片
                    </Button>
                  </Upload>,
                )}
              </Form.Item>}
            </Form>
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