import React from "react";
import { Route } from "dva/router";
import { Layout } from "antd";
import Home from "../home";
import OpenPage from "../openPage";
import Carousel from '../carousel';
import "./index.less"


const Test = ()=> {
    return (
        <div>TEST</div>
    )
}

const { Content } = Layout;
const MainContent = ()=> {
	return (
		<Content className="content">
			<Route path="/manage/test" component={Test} />
			<Route path="/manage/home" component={Home} />
			<Route path="/manage/openPage" component={OpenPage} />
			<Route path="/manage/carousel" component={Carousel} />
		</Content>
	);
}
export default MainContent;