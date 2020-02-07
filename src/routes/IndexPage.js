import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { useState } from "react";
import { connect } from "dva";
import menuConfig from "../utils/menuConfig";
import { Link } from "react-router-dom";
import "./index.less";

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;


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
          // height: '100vh',
          // position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {
            menuConfig.map((item, index)=> {
              if(item.children&&item.children.length) {
                return (
                  <SubMenu key={index} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {item.children.map((item, index) => (
                    <Menu.Item key={item.index}><Link style = {{textDecoration:"none"}} to={item.url}>{item.title}</Link></Menu.Item>
                  ))}
                </SubMenu>
                )
              }
              return (
                <Menu.Item key={index}>
                  <Link to = {item.url} style = {{textDecoration:"none"}}>
                  <Icon type = {item.icon} />
                  <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
      <Layout >
        <Header style={{ background: '#fff', padding: 0 }} >这里是header</Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    )
  
}





export default connect()(MainMenu);
