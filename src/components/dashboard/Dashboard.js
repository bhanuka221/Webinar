import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import MainContent from "./mainContent/MainContent";
import NavBar from "./NavBar/NavBar";

export default class Dashboard extends Component {
  render() {
    return (
      <div className={classes.container}>
        <NavBar />
        <MainContent />
        <footer></footer>
      </div>
    );
  }
}
