import React, { Component } from "react";
import classes from "./NavBar.module.css";
import { removeAuthDataFromLocalStorage } from "../../../util/helper";

export default class NavBar extends Component {
  onLogHandler = () => {
    if (this.props.accessToken) {
      this.props.onLogout({});
      removeAuthDataFromLocalStorage();
    } else {
      this.props.history.push("/api/login");
    }
  };

  getLogName = () => {
    return this.props.accessToken ? "Logout" : "Login";
  };

  render() {
    return (
      <nav class="navbar navbar-dark bg-primary">
        <div className={classes.container}>
          <label>Webinar</label>
          <button
            button
            type="button"
            class="btn btn-outline-light"
            onClick={this.onLogHandler}
          >
            {this.getLogName()}
          </button>
          <button
            button
            type="button"
            class="btn btn-outline-light"
            onClick={() => {
              this.props.history.push("/api/signUp");
            }}
          >
            Sign-up
          </button>
        </div>
      </nav>
    );
  }
}
