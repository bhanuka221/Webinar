import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import MainContent from "./mainContent/MainContent";
import NavBar from "./NavBar/NavBar";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/index";

class Dashboard extends Component {
  render() {
    return (
      <div className={classes.container}>
        <NavBar
          history={this.props.history}
          accessToken={this.props.accessToken}
          onLogout={this.props.onSaveAuthData}
        />
        <MainContent history={this.props.history} />
        <footer></footer>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
