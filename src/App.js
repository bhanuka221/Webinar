import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/user/login/Login";
import SignUp from "./components/user/signUp/SignUp";
import { getAuthDataFromLocalStorage } from "./util/helper";
import * as actionTypes from "./components/store/actions/index";
import axios from "axios";
import ForgetPassword from "./components/user/passwordChanges/forgetPassword/ForgetPassword";
import ResetPassword from "./components/user/passwordChanges/resetPassword/ResetPassword";

class App extends Component {
  componentDidMount() {
    let authData = getAuthDataFromLocalStorage();
    authData && this.props.onSaveAuthData(authData);
  }

  setAccessToken = () => {
    const token = this.props.accessToken
      ? `Bearer ${this.props.accessToken}`
      : "";
    axios.defaults.headers.common["Authorization"] = token;
  };

  render() {
    this.setAccessToken();
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/api/forgetPassword"
              component={ForgetPassword}
            />
            <Route
              exact
              path="/api/resetPassword/:token"
              component={ResetPassword}
            />
            <Route exact path="/api/login" component={Login} />
            <Route exact path="/api/signUp" component={SignUp} />
            <Route exact path="/api" component={Dashboard} />
            <Redirect from="/" to="/api" />
            <Route render={() => <h1>Page Not Found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveAuthData: (authData) => dispatch(actionTypes.saveAuthData(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
