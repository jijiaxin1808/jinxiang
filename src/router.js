import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from "./routes/login";
import FPassword from "./routes/forgetPassword";
import PrivateRoute from "./utils/PrivateRoute";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <PrivateRoute path="/manage" component={IndexPage} />
      {/* <Route path="/manage" component={IndexPage} /> */}
      <Route path="/login" component={Login} />
      <Route path="/FPassword" component={FPassword} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;