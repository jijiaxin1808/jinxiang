import { Icon as LegacyIcon } from '@ant-design/compatible';
// import Icon, { CodeFilled, SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from "react";
import { connect } from "dva";
import menuConfig from "../utils/menuConfig";
import { Link } from "dva/router";
import "./index.less";
import MainContent from "./mainContent";
import Hedaer from "./header";

const { SubMenu } = Menu;
const {  Sider, Footer } = Layout;

const MainMenu = ()=> {
  
  const [collapsed, setcollapsed ] =  useState(false)

    return (
      <Layout>
      <Sider
        collapsible
        collapsed = { collapsed }
        onCollapse = {()=>{setcollapsed(!collapsed)}}
        style={{
          overflow: 'auto',
          left: 0,
        }}
      >
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {
            menuConfig.map((item, index)=> {
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
      </Sider>
      <Layout >
        <Hedaer />
          <MainContent/>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    );
}

export default connect()(MainMenu);