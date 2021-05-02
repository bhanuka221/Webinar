import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/user/login/Login";
import SignIn from "./components/user/signIn/SignIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard/>
        {/* <Login />
        <SignIn /> */}
      </div>
    );
  }
}

export default App;
