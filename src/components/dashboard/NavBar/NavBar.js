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
          <span className={classes.webinar}>Webinar</span>
          <span className={classes.leftSpan}>
          <button
                button
                type="button"
                class="btn btn-outline-light"
                onClick={this.onLogHandler}
              >
                {this.getLogName()}
              </button>
              {!this.props.accessToken && <button
                button
                type="button"
                class="btn btn-outline-light"
                onClick={() => {
                  this.props.history.push("/api/signUp");
                }}
              >
                Sign-up
              </button>}
              
              {/* {this.props.accessToken && <button
                button
                type="button"
                class="btn btn-outline-light"
                // onClick={() => {
                //   this.props.history.push("/api/signUp");
                // }}
              >
                Settings
              </button> } */}

              

          </span>
        </div>
      </nav>
    );
  }
}
