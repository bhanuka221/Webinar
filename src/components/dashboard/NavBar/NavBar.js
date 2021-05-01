import React, { Component } from "react";
import classes from "./NavBar.module.css";

export default class NavBar extends Component {
  render() {
    return (
      <nav class="navbar navbar-dark bg-primary">
        <div className={classes.container}>
          <label>Webinar</label>
          <button button type="button" class="btn btn-outline-light">Login</button>
        </div>
      </nav>
    );
  }
}
