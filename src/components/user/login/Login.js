import axios from "axios";
import React, { Component, Fragment } from "react";
import classes from "./Login.module.css";
import { connect } from "react-redux";
import * as constants from "../../../util/constant";
import * as actionTypes from "../../store/actions/index";
import { saveAuthDataOnLocalStorage } from "../../../util/helper";
import SweetAlert from "react-bootstrap-sweetalert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showAlert: false,
    alertTiltle: "",
    alertType: "",
  };

  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const authData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post(constants.BASE_URL + "/user/login", authData)
      .then((response) => {
        this.setState({
          ...this.state,
          showAlert: true,
          alertTiltle: response.data.message,
          alertType: constants.SUCCESS,
        });
        this.props.onSaveAuthData(response.data);
        this.props.history.push("/api");
        saveAuthDataOnLocalStorage(response.data);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            ...this.state,
            showAlert: true,
            alertTiltle: error.response.data.message,
            alertType: constants.ERROR,
          });
        }
      });
  };

  renderTopBar = () => (
    <nav class="navbar navbar-dark bg-primary">
      <div className={classes.container}>
        <span
          className={classes.webinar}
          onClick={() => {
            this.props.history.push("/api");
          }}
        >
          Webinar
        </span>
      </div>
    </nav>
  );

  alertTimeOut = () => {
    setTimeout(() => {
      this.setState({ ...this.state, showAlert: false });
    }, 3000);
  };

  renderAlert = () => {
    if (this.state.showAlert) {
      return (
        <SweetAlert
          type={this.state.alertType}
          title={this.state.alertTiltle}
          onConfirm={this.alertTimeOut()}
          show={this.state.showAlert}
          confirmBtnStyle={{ display: "none" }}
        />
      );
    }
    return null;
  };

  render() {
    const { email, password } = this.state;

    return (
      <Fragment>
        {this.renderTopBar()}
        {this.renderAlert()}
        <div className={classes.login}>
          <form onSubmit={(e) => this.onSubmitHandler(e)}>
            <div class="mb-3">
              <label className={classes.header}>Sign In</label>
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => this.formOnChangeHandler(e)}
              />

              <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => this.formOnChangeHandler(e)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Sign-In
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveAuthData: (authData) => dispatch(actionTypes.saveAuthData(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
