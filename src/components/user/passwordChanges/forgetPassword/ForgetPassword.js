import React, { Component, Fragment } from "react";
import classes from "./ForgetPassword.module.css";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import * as constants from "../../../../util/constant";

class ForgetPassword extends Component {
  state = {
    showAlert: false,
    email: "",
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

  formOnChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      email: this.state.email,
    };

    axios
      .post(constants.BASE_URL + "/user/forgetPassword", data)
      .then((response) => {
        this.setState({
          ...this.state,
          showAlert: true,
          alertTiltle: response.data.message,
          alertType: constants.SUCCESS,
        });
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

  render() {
    const { email } = this.state;

    return (
      <Fragment>
        {this.renderTopBar()}
        {this.renderAlert()}
        <div className={classes.login}>
          <form onSubmit={(e) => this.onSubmitHandler(e)}>
            <div class="mb-3">
              <label className={classes.header}>Forget Password</label>
              <label for="exampleInputEmail1" className="form-label">
                Enter Registered Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => this.formOnChangeHandler(e)}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Send Link
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ForgetPassword;
