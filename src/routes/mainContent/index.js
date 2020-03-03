import React from "react";
import { Route } from "dva/router";
import { Layout } from "antd";
import Home from "../home";
import OpenPage from "../openPage";
import HotSearch from "../hotSearch";
import IndexSort from "../indexSort";
import Users from "../users";
import QuestionBank from "../qustionBank";
import ActivityAnalysis from "../activityAnalysis";
import FunctionAnalysis from "../functionAnalysis";
import OrderAnalysis from "../orderAnalysis";
import UsersAnalysis from "../usersAnalysis";
import Beautify from "../beautify";
import SchoolA from "../schoolA";
import Push from "../push";
import User from "../user";
import Carousel from "../carousel"
import Activity from "../activity";
import AllSort from "../allSort";
import FpassWord from "../forgetPassword";

import "./index.less"

const { Content } = Layout;
const MainContent = ()=> {
	return (
		<Content className="content">
			<Route path="/manage/home" component={Home} />
			<Route path="/manage/openPage" component={OpenPage} />
			<Route path="/manage/trending" component={HotSearch} />
			<Route path="/manage/indexSort" component={IndexSort} />
			<Route path="/manage/users" component={Users} />
			<Route path="/manage/activityAnalysis" component={ActivityAnalysis} />
			<Route path="/manage/functionAnalysis" component={FunctionAnalysis} />
			<Route path="/manage/orderAnalysis" component={OrderAnalysis} />
			<Route path="/manage/usersAnalysis" component={UsersAnalysis} />
			<Route path="/manage/qustionBank" component={QuestionBank} />
			<Route path="/manage/beautify" component={Beautify} />
			<Route path="/manage/schoolA" component={SchoolA} />
			<Route path="/manage/push" component={Push} />
			<Route path="/manage/user" component={User} />
			<Route path="/manage/carousel" component={Carousel} />
			<Route path="/manage/Activity" component={Activity} />
			<Route path="/manage/allSort" component={AllSort} />
			{/* <Route path="/manage/fpassWord" component={FpassWord} /> */}
		</Content>
	);
}
export default MainContent;