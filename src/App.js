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
