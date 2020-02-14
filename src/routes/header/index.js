import React from "react";
import { Layout, Icon } from "antd";
import "./index.less";
import { Menu, Dropdown, Button, Badge, Avatar } from 'antd';
import { Link } from "dva/router";

const menu = (
    <Menu>
      <Menu.Item>
        <div onClick = {()=>{localStorage.clear(); window.location.href = "/login"}}>推出登录</div>
      </Menu.Item>
    </Menu>
);


const { Header } = Layout;

const MainHeader = ()=> {
    return (
        <Header className = "header">
            <div className = "header-logo">
                <img alt = "logo"/>
                <div>
                    <h2>近享公众平台</h2>
                    <p>近??, 享生活</p>
                </div>
            </div>
            <div className = "header-user">
                <Icon />
                <Dropdown overlay={menu} placement = "bottomCenter">
                    {/* <Button>迷迷糊糊</Button> */}
                    <Badge count={5}>
                        <Avatar shape="square" size="large" icon="user" />  
                    </Badge>
                </Dropdown>
            </div>
        </Header>
    )
}

export default MainHeader;