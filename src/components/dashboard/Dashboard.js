import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import NavBar from "./NavBar/NavBar";

export default class Dashboard extends Component {
  render() {
    return <div className={classes.container}>
        <NavBar/>
        <main></main>
        <footer></footer>
    </div>;
  }
}
