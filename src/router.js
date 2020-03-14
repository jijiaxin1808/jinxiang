import React, {lazy, Suspense} from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loading from "./components/loading";
// import Login from "./routes/login";
// import FPassword from "./routes/forgetPassword";
// import IndexPage from "./routes/IndexPage";
import PrivateRoute from "./utils/PrivateRoute";
const IndexPage = lazy(()=> import("./routes/IndexPage"));
const Login = lazy(()=> import("./routes/login"));
const FPassword = lazy(()=> import("./routes/forgetPassword"));



function RouterConfig({ history }) {
  return (
	<Suspense fallback = {Loading}>
		<Router history={history}>
			<Switch>
				<PrivateRoute path="/manage" component={IndexPage} />
				<Route path="/login" component={Login} />
				<Route path="/FPassword" component={FPassword} />
			</Switch>
		</Router>
	</Suspense>
  );
}

export default RouterConfig;