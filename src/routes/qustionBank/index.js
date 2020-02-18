import　React, { useEffect, useState } from "react";
import { Button, Table, message, Modal, Form, Input } from "antd";
import * as API from "../../config/api";
const QustionBank = (props)=> {

    const [modalLoading, setModalLoading] = useState(false);
    const [modalVisible, setMoadlVisible] = useState(false);
    const { getFieldDecorator, validateFields } = props.form;
    const [data, setData] = useState();

    const handleOk = ()=> {
        setModalLoading(true);
        validateFields((err, values)=> {
            if(err) {
                setModalLoading(false);
            }
            else {
                const {A1, A2, A3, A4} = values;
                const Qdata = {
                    question: values.question,
                    option: `${A1}#${A2}#${A3}#${A4}`
                }
                API.createQuestion(Qdata)
                .then(res=> {
                    if(res.data.code === 0) {
                        const newData = [...data];
                        newData.unshift(Qdata)
                        setData(newData);
                        setModalLoading(false);
                        setMoadlVisible(false);
                    }
                })
            }
        })
    }
    const handleCancel = ()=> {
        setMoadlVisible(false);
    }


    useEffect(()=> {
        const params = {
            page: 1,
            size:10
        }
        API.questionBySchool(params)
        .then(res => {
            if(res.data.code === 0) {
                // message.success("获取成功")
                setData(res.data.data)
            }
        })
    },[])

    const columns = [
      {
        title: '问题',
        dataIndex: 'question',
        key: 'question',
        render: text => <a>{text}</a>,
      },
      {
        title: '正确答案',
        dataIndex: 'option',
        key: 'A1',
        render: text => text.split("#")[0]
      },
      {
        title: '错误答案1',
        dataIndex: 'option',
        key: 'A2',
        render: text => text.split("#")[1]
      },
      {
        title: '错误答案2',
        key: 'A3',
        dataIndex: 'option',
        render: text => text.split("#")[2]
      },
      {
        title: '错误答案3',
        key: 'A4',
        dataIndex: "option",
        render: text => text.split("#")[3]
      },
    ];
    

    
    return (
        <div>
            <div className = "title">题库管理</div>
            <div className = "title-text">设置题库</div>
            <p style = {{display: "inline-block", marginRight: 700}}>为您的学校设置题库，以确保您的用户均为本校学生。</p>
            <Button onClick = {()=> {setMoadlVisible(true)}} type = "primary">新增</Button>
            <Modal
					title="请选择封禁时长"
					visible={modalVisible}
					confirmLoading={modalLoading}
					onOk={handleOk}
					onCancel={handleCancel}
					className = "openPage-modal"
					okText = "确认"
					cancelText = "取消"
				>

            <>
                <Form  >
                    <Form.Item>
                    {getFieldDecorator('question', {
                        rules: [{ required: true, message: '请输入问题' }],
                    })(
                        <Input placeholder="问题"/>
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator("A1", {
                        rules: [{ required: true, message: '请输入回答1' }],
                    })(
                        <Input placeholder="正确选项"/>
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator("A2", {
                        rules: [{ required: true, message: '请输入回答2' }],
                    })(
                        <Input placeholder="错误选项1"/>
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator("A3", {
                        rules: [{ required: true, message: '请输入回答3' }],
                    })(
                        <Input placeholder="错误选项2"/>
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator("A4", {
                        rules: [{ required: true, message: '请输入回答4' }],
                    })(
                        <Input placeholder="错误选项3"/>
                    )}
                    </Form.Item>
                </Form>
                </>
			</Modal>
            <Table columns={columns} dataSource={data} style = {{marginTop: 20}} />
            <div className = "warn">额  暂时没发现bug</div>
        </div>
    )
}

export default Form.create()(QustionBank);