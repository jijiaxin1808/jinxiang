import　React, { useEffect, useState } from "react";
import '@ant-design/compatible/assets/index.css';
import { Button, Table, Modal, Input, Form } from "antd";
import * as API from "../../config/api";

const QustionBank = (props)=> {

    const [modalLoading, setModalLoading] = useState(false);
    const [modalVisible, setMoadlVisible] = useState(false);
    const [data, setData] = useState();
    const [ form ] = Form.useForm();
    const handleOk = ()=> {
        setModalLoading(true);
        form.validateFields()
        .then(values=> {
            const {A1, A2, A3, A4} = values;
            const Qdata = {
                question: values.question,
                option: `${A1}#${A2}#${A3}#${A4}`
            }
            API.createQuestion(Qdata)
            .then(res=> {
                if(res.data.code === 0) {
                    const newData = [...data];
                    newData.unshift({...Qdata,id:res.data.data.id})
                    setData(newData);
                    setModalLoading(false);
                    setMoadlVisible(false);
                }
            })
        })
    }
    const handleCancel = ()=> {
        setMoadlVisible(false);
        setModalLoading(false);
    }

    useEffect(()=> {
        const params = {
            page: 1,
            size:10,
            schoolId:localStorage.getItem("schoolId")
        }
        API.questionBySchool(params)
        .then(res => {
            if(res.data.code === 0) {
                setData(res.data.data)
            }
        })
    },[])

    const columns = [
        {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: text => text
        },
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
      {
        title: '操作',
        key: 'delete',
        dataIndex: "id",
        render: text => <Button onClick = {()=> {deleteQuestion(text)}}>删除</Button>
      },
    ];
    const deleteQuestion = (id)=> {
        API.deleteQuestion({id})
        .then(res=> {
            if(res.data.code === 0) {
                const newData = [...data].filter(item=> item.id!==id);
                setData(newData);
            }
        })
    }

    return (
        <div>
            <div className = "title">题库管理</div>
            <div className = "title-text">设置题库</div>
            <p style = {{display: "inline-block", marginRight: 700}}>为您的学校设置题库，以确保您的用户均为本校学生。</p>
            <Button onClick = {()=> {setMoadlVisible(true)}} type = "primary">新增</Button>
            <Modal
            title="新增题目"
            visible={modalVisible}
            confirmLoading={modalLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            className = "openPage-modal"
            okText = "确认"
            cancelText = "取消"
			>
            <>
                <Form  form = {form}>
                    <Form.Item name = "question" label = "问题" 
                    rules = {[{ required: true, message: '请输入问题' },{max:20,message:"超过字数限制"}]}>
                        <Input placeholder="问题"/>
                    </Form.Item>
                    <Form.Item name = "A1"  label = "正确选项"
                    rules = {[{ required: true, message: '正确选项' },{max:20,message:"超过字数限制"}]}>
                        <Input placeholder="正确选项"/>
                    </Form.Item>
                    <Form.Item name = "A2" label = "错误选项1"
                    rules = {[{ required: true, message: '错误选项1' },{max:20,message:"超过字数限制"}]}>
                        <Input placeholder="错误选项1"/>
                    </Form.Item>
                    <Form.Item name = "A3" label = "错误选项2"
                    rules = {[{ required: true, message: '错误选项2' },{max:20,message:"超过字数限制"}]}>
                        <Input placeholder="错误选项2"/>
                    </Form.Item>
                    <Form.Item name = "A4" label = "错误选项3"
                    rules = {[{ required: true, message: '错误选项3' },{max:20,message:"超过字数限制"}]}>
                        <Input placeholder="错误选项3"/>
                    </Form.Item>
                </Form>
                </>
			</Modal>
            <Table columns={columns} dataSource={data} style = {{marginTop: 20}} />
        </div>
    )
}

export default QustionBank;