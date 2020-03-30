import React, {lazy, Suspense} from "react";
import { Route } from "dva/router";
import { Layout } from "antd";
import Loading from "../../components/loading";
const Home = lazy(()=> import('../home'));
const OpenPage = lazy(()=> import('../openPage'));
const HotSearch = lazy(()=> import("../hotSearch"));
const IndexSort = lazy(()=> import("../indexSort"));
const Users = lazy(()=> import("../users"));
const QuestionBank = lazy(()=> import("../qustionBank"));
const ActivityAnalysis = lazy(()=> import("../activityAnalysis"));
const FunctionAnalysis = lazy(()=> import("../functionAnalysis"));
const OrderAnalysis = lazy(()=> import("../orderAnalysis"));
const UsersAnalysis = lazy(()=> import("../usersAnalysis"));
const Beautify = lazy(()=> import("../beautify"));
const SchoolA = lazy(()=> import("../schoolA"));
const Push = lazy(()=> import("../push"));
const User = lazy(()=> import("../user"));
const Carousel = lazy(()=> import("../carousel"));
const Activity = lazy(()=> import("../activity"));
const AllSort = lazy(()=> import("../allSort"));
const FpassWord = lazy(()=> import("../forgetPassword"));

const { Content } = Layout;



const MainContent = ()=> {
	return (
		<Suspense fallback={<Loading />} maxDuration={500}>
			<Content className = "mainContent">
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
				<Route path="/manage/fpassWord" component={FpassWord} />
			</Content>
		</Suspense>
	);
}

export default MainContent;