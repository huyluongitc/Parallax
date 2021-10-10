import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // eslint-disable-line

import Page from "./components/pages/Home";
import Auth from "./components/auths/HomeAuth"
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Page} />
        </Switch>
      </Router>
    );
  }
}

export default App;
