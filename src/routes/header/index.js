import React from "react";
import { Layout } from "antd";
import "./index.less";
import { Menu, Dropdown,Badge, Avatar } from 'antd';

const menu = (
    <Menu>
      <Menu.Item>
        <div onClick = {()=>{localStorage.clear(); window.location.href = "/#/login"}}>退出登录</div>
      </Menu.Item>
    </Menu>
);


const { Header } = Layout;

const MainHeader = ()=> {
    return (
        <Header className = "header">
            <div className = "header-logo">
                <div className = "i"></div>
                <div className = "flex-center">
                    <h2>近享公众平台</h2>
                </div>
            </div>
            <div className = "header-user">
                <Dropdown overlay={menu} placement = "bottomCenter" className = "">
                    <Badge count={5}>
                        <Avatar shape="square" size="large" icon="user" />  
                    </Badge>
                </Dropdown>
            </div>
        </Header>
    )
}

export default MainHeader;