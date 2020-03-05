import React from 'react';
import {Tabs} from 'antd';
import './index.less';
import Add from './add';
import Manage from './manage';

const { TabPane } = Tabs;

const Tab = () =>{
    return(
        <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  添加轮播图
                </span>
              }
              key="1"
            >
              <Add />
            </TabPane>
            <TabPane
              tab={
                <span>
                  管理轮播图
                </span>
              }
              key="2"
            >
              <Manage />
            </TabPane>
          </Tabs>
    )
}

export default Tab;
