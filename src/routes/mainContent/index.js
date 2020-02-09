import React from "react";
import { Route } from "dva/router";
import { Layout } from "antd";
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
			<Route path="/manage/" component={Test} />
			<Route path="/manage/test" component={()=>(<div>test1</div>)} />
		</Content>
	);
}
export default MainContent;