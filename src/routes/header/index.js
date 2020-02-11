import React from "react";
import { Layout, Icon } from "antd";
import "./index.less";
import { Menu, Dropdown, Button } from 'antd';
import { Link } from "dva/router";

const menu = (
    <Menu>
      <Menu.Item>
        <Link to = "/manage/user">个人信息</Link>
      </Menu.Item>
      <Menu.Item>
        <div onClick = {()=>{this.localStorage.clear(); window.location.href = "/manage/login"}}>推出登录</div>
      </Menu.Item>
    </Menu>
);



const { Header } = Layout;

const MainHeader = ()=> {
    return (
        <Header className = "header">
            <div className = "header-logo">
                <img/>
                <div>
                    <h2>近享公众平台</h2>
                    <p>近??, 享生活</p>
                </div>
            </div>
            <div className = "header-user">
                <Icon />
                <Dropdown overlay={menu} placement="bottomLeft">
                    {/* <h1>迷迷糊糊</h1>
                    <p>近享官方团队成员</p> */}
                    <Button>迷迷糊糊</Button>
                </Dropdown>
            </div>
        </Header>
    )
}

export default MainHeader;