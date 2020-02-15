import React from "react";
import { Route } from "dva/router";
import { Layout } from "antd";
import Home from "../home";
import OpenPage from "../openPage";
import HotSearch from "../hotSearch";
import IndexSort from "../indexSort";
import "./index.less"

const { Content } = Layout;
const MainContent = ()=> {
	return (
		<Content className="content">
			<Route path="/manage/home" component={Home} />
			<Route path="/manage/openPage" component={OpenPage} />
			<Route path="/manage/trending" component={HotSearch} />
			<Route path="/manage/indexSort" component={IndexSort} />
		</Content>
	);
}
export default MainContent;