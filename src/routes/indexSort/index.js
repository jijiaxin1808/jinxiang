import React from "react";
import "./index.less";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";

const IndexSort = ()=> {

        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
              	key: i.toString(),
              	name: `Edrward ${i}`,
              	age: 32,
              	address: `London Park no. ${i}`,
            });
        }
        const EditableContext = React.createContext();
          
          class EditableCell extends React.Component {
            getInput = () => {
              return <Input />;
            };
          
            renderCell = ({ getFieldDecorator }) => {
              const {
                editing,
                dataIndex,
                title,
                record,
                index,
                children,
                ...restProps
              } = this.props;
              return (
                <td {...restProps}>
                  {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                      {getFieldDecorator(dataIndex, {
                        rules: [
                          {
                            required: true,
                            message: `请输入 ${title}!`,
                          },
                        ],
                        initialValue: record[dataIndex],
                      })(this.getInput())}
                    </Form.Item>
                  ) : (
                    children
                  )}
                </td>
              );
            };
          
            render() {
              return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
            }
          }
          
		class EditableTable extends React.Component {
		constructor(props) {
			super(props);
			this.state = { data, editingKey: '' };
			this.columns = [
			{
				title: '序号',
				dataIndex: 'name',
				width: '25%',
				editable: false,
			},
			{
				title: '分类',
				dataIndex: 'age',
				width: '15%',
				editable: true,
			},
			{
				title: 'icon',
				dataIndex: 'address',
				width: '40%',
				editable: true,
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) => {
				const { editingKey } = this.state;
				const editable = this.isEditing(record);
				return editable ? (
					<span>
					<EditableContext.Consumer>
						{form => (
						<a
							onClick={() => this.save(form, record.key)}
							style={{ marginRight: 8 }}
						>
							保存
						</a>
						)}
					</EditableContext.Consumer>
					<Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)} okText = "确认" cancelText = "取消">
						<a>取消</a>
					</Popconfirm>
					</span>
				) : (
					<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
					修改
					</a>
				);
				},
			},
			];
		}
		
		isEditing = record => record.key === this.state.editingKey;
		
		cancel = () => {
			this.setState({ editingKey: '' });
		};
		
		save(form, key) {
			form.validateFields((error, row) => {
			if (error) {
				return;
			}
			const newData = [...this.state.data];
			const index = newData.findIndex(item => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
				...item,
				...row,
				});
				this.setState({ data: newData, editingKey: '' });
			} else {
				newData.push(row);
				this.setState({ data: newData, editingKey: '' });
			}
			});
		}
		
		edit(key) {
			this.setState({ editingKey: key });
		}
		
		render() {
			const components = {
			body: {
				cell: EditableCell,
			},
			};
		
			const columns = this.columns.map(col => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
				record,
				inputType: col.dataIndex === 'age' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: this.isEditing(record),
				}),
			};
			});
		
			return (
			<EditableContext.Provider value={this.props.form}>
				<Table
				components={components}
				dataSource={this.state.data}
				columns={columns}
				rowClassName="editable-row"
				// pagination={{
				// 	onChange: this.cancel,
				// }}
				pagination = {false}
				/>
			</EditableContext.Provider>
			);
		}
		}
          
		const EditableFormTable = Form.create()(EditableTable);
		

		class LabelSort extends React.Component {
			constructor(props) {
				super(props);
				this.state = { data, editingKey: '' };
				this.columns = [
				{
					title: '序号',
					dataIndex: 'name',
					width: '25%',
					editable: false,
				},
				{
					title: '分类',
					dataIndex: 'age',
					width: '15%',
					editable: true,
				},
				{
					title: '操作',
					dataIndex: 'operation',
					render: (text, record) => {
					const { editingKey } = this.state;
					const editable = this.isEditing(record);
					return editable ? (
						<span>
						<EditableContext.Consumer>
							{form => (
							<a
								onClick={() => this.save(form, record.key)}
								style={{ marginRight: 8 }}
							>
								保存
							</a>
							)}
						</EditableContext.Consumer>
						<Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)} okText = "确认" cancelText = "取消">
							<a>取消</a>
						</Popconfirm>
						</span>
					) : (
						<a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
						修改
						</a>
					);
					},
				},
				];
			}
			
			isEditing = record => record.key === this.state.editingKey;
			
			cancel = () => {
				this.setState({ editingKey: '' });
			};
			
			save(form, key) {
				form.validateFields((error, row) => {
				if (error) {
					return;
				}
				const newData = [...this.state.data];
				const index = newData.findIndex(item => key === item.key);
				if (index > -1) {
					const item = newData[index];
					newData.splice(index, 1, {
					...item,
					...row,
					});
					this.setState({ data: newData, editingKey: '' });
				} else {
					newData.push(row);
					this.setState({ data: newData, editingKey: '' });
				}
				});
			}
			
			edit(key) {
				this.setState({ editingKey: key });
			}
			
			render() {
				const components = {
				body: {
					cell: EditableCell,
				},
				};
			
				const columns = this.columns.map(col => {
				if (!col.editable) {
					return col;
				}
				return {
					...col,
					onCell: record => ({
					record,
					inputType: col.dataIndex === 'age' ? 'number' : 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record),
					}),
				};
				});
			
				return (
				<EditableContext.Provider value={this.props.form}>
					<Table
					components={components}
					dataSource={this.state.data}
					columns={columns}
					rowClassName="editable-row"
					// pagination={{
					// 	onChange: this.cancel,
					// }}
					pagination = {false}
					/>
				</EditableContext.Provider>
				);
			}
			}
			  
			const WarppedLabelSort = Form.create()(LabelSort);




    return (
        <>
        <div className = "title">首页分类</div>
        <p className = "title-text">主分页</p>
		<EditableFormTable />
		<p className = "title-text">标签分类</p>
		<WarppedLabelSort />
        </>
    )

}
export default IndexSort;