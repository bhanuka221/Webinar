import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/user/login/Login";
import SignUp from "./components/user/signUp/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Switch>
            <Route path="/api/login" component={Login} />
            <Route path="/api/signUp" component={SignUp} />
            <Route path="/api" component={Dashboard} />
            <Redirect from="/" to="/api" />
            <Route render={() => <h1>Page Not Found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
