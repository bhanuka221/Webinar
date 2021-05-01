import React, { Component } from "react";
import "./App.css";
import Login from "./components/user/login/Login";
import SignIn from "./components/user/signIn/SignIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
        <Login />
      </div>
    );
  }
}

export default App;
