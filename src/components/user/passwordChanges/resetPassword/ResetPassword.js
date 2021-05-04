import React, { Component, Fragment } from "react";
import classes from "./ResetPassword.module.css";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import * as constants from "../../../../util/constant";
import * as formValidation from "../../../../util/formValidation";

class ResetPassword extends Component {
  state = {
    showAlert: false,
    alertTiltle: "",
    alertType: "",
    password: "",
    confirmPassword: "",
    validForm: false,
    error: {
      password: {
        value: "",
        isTouched: false,
      },
      confirmPassword: {
        value: "",
        isTouched: false,
      },
    },
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
      if(this.state.alertType === constants.SUCCESS){
        this.props.history.push("/api/login");
      }
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

  formOnChangeHandler = (event) => {
    const { id, value } = event.target;
    this.setState(
      {
        ...this.state,
        [id]: value,
      },
      () => {
        this.isFormValid(id, value, true);
      }
    );
  };

  isFormValid = (key, value, isTouched) => {
    let validForm = true;
    const errorMessages = {
      password: "",
      confirmPassword: "",
    };

    switch (key) {
      case "password":
        if (formValidation.isEmpty(value) && isTouched) {
          validForm = false;
          errorMessages.password = "Password is required";
        } else if (
          (!formValidation.minLengthMatched(5, value) ||
            !formValidation.maxLengthMatched(15, value)) &&
          isTouched
        ) {
          validForm = false;
          errorMessages.password = "Password length must be 5 to 15 characters";
        }
        break;
      case "confirmPassword":
        if (
          !formValidation.passwordMatches(this.state.password, value) &&
          isTouched
        ) {
          validForm = false;
          errorMessages.confirmPassword = "Passwords are not same";
        }
        break;
    }

    this.setErrorsToState(errorMessages, key, isTouched, validForm);
  };

  getStateCopy = () => {
    let updateState = { ...this.state, error: { ...this.state.error } };

    Object.keys(this.state.error).map((key) => {
      updateState = {
        ...this.state,
        error: {
          ...this.state.error,
          [key]: {
            ...this.state.error[key],
          },
        },
      };
    });

    return updateState;
  };

  checkValidForm = (updateState) => {
    let validForm = true;
    Object.keys(updateState.error).map((key) => {
      if (!(this.checkInputValid(key, updateState) && validForm)) {
        validForm = false;
      }
    });

    return validForm;
  };

  setErrorsToState = (errorMessage, validationKey, isTouched, validForm) => {
    let updateState = this.getStateCopy();
    Object.keys(updateState.error).map((key) => {
      updateState.error[key].value =
        validationKey === key
          ? errorMessage[validationKey]
          : updateState.error[key]["value"];
      updateState.error[key].isTouched =
        validationKey === key ? isTouched : updateState.error[key]["isTouched"];
    });

    updateState.validForm = this.checkValidForm(updateState);

    this.setState({
      ...updateState,
    });
  };

  renderInvalid = (id) => {
    if (this.checkInputValid(id, this.state)) {
      return null;
    } else {
      return (
        <span className={classes.errorSpan}>{this.state.error[id].value}</span>
      );
    }
  };

  checkInputValid = (id, obj) => {
    const { value, isTouched } = obj.error[id];
    return formValidation.isEmpty(value) && isTouched;
  };

  getCssClasses = (...arr) => {
    return arr.join(" ");
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      password: this.state.password,
      token: this.props.match.params.token,
    };

    axios
      .post(constants.BASE_URL + "/user/resetPassword", data)
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
    const { password, confirmPassword, validForm } = this.state;
    const error = this.state.error;

    return (
      <Fragment>
        {this.renderTopBar()}
        {this.renderAlert()}
        <div className={classes.login}>
          <form onSubmit={(e) => this.onSubmitHandler(e)}>
            <div className="mb-3">
              <label className={classes.header}>Reset Password</label>
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={
                  formValidation.isEmpty(error["password"].value)
                    ? "form-control"
                    : this.getCssClasses("form-control", classes.error)
                }
                id="password"
                value={password}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
              {this.renderInvalid("password")}
            </div>

            <div className="mb-3">
              <label for="reEnter" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={
                  formValidation.isEmpty(error["confirmPassword"].value)
                    ? "form-control"
                    : this.getCssClasses("form-control", classes.error)
                }
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
              {this.renderInvalid("confirmPassword")}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!validForm}
              >
                Update Password
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ResetPassword;
