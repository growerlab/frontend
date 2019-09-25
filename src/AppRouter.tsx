import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";

import React from "react";
import Index from "./pages/index";
import Register from "./pages/register";

const history = createBrowserHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
