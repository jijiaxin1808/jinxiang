import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Menu, Button } from 'antd';
import React from "react";
import menuConfigA from "../config/menuConfigA";
import menuConfigB from "../config/menuConfigB";
import { Link } from "dva/router";
import "./index.less";
import MainContent from "./mainContent";
import Hedaer from "./header";
import * as session from "../utils/session";

const { SubMenu } = Menu;
const {  Sider, Footer } = Layout;

const Menus = (props)=> {
	return (
		<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
		{
			props.config.map((item, index)=> {
				if(item.children&&item.children.length) {
				return (
					<SubMenu key={index} title={<span><LegacyIcon type={item.icon} /><span>{item.title}</span></span>}>
						{item.children.map((item, index) => (
							<Menu.Item key={item.title}><Link style = {{textDecoration:"none"}} to={item.url}>{item.title}</Link></Menu.Item>
						))}
					</SubMenu>
				);
				}
				return (
				<Menu.Item key={index}>
					<Link to = {item.url} style = {{textDecoration:"none"}}>
					<LegacyIcon type = {item.icon} />
					<span>{item.title}</span>
					</Link>
				</Menu.Item>
				);
			})
		}
        </Menu>
	)
}

const MainMenu = ()=> {
	const changeA = ()=> {
		localStorage.setItem("level",true);
		console.log(session.getLevelA());
	}
	const changeB = ()=> {
		localStorage.setItem("level","");
		console.log(session.getLevelA());
	}

    return (
		<>
		<Button onClick = {changeA}>A级权限</Button>
		<Button onClick = {changeB}>B级权限</Button>
		<Layout>
			<Sider>
				<div className="logo" />
				<Menus config = {localStorage.getItem("level")?menuConfigA:menuConfigB}/>
			</Sider>
			<Layout >
				<Hedaer />
				<MainContent />
				<Footer style={{ textAlign: 'center' }}>不洗碗工作室@2020</Footer>
			</Layout>
		</Layout>
		</>
    );
}

export default MainMenu;