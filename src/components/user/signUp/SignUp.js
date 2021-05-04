import axios from "axios";
import React, { Component, Fragment } from "react";
import classes from "./SignUp.module.css";
import * as constants from "../../../util/constant";
import * as formValidation from "../../../util/formValidation";
import SweetAlert from "react-bootstrap-sweetalert";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    reEnterPassowrd: "",
    validForm: false,
    error: {
      name: {
        value: "",
        isTouched: false,
      },
      email: {
        value: "",
        isTouched: false,
      },
      mobileNumber: {
        value: "",
        isTouched: false,
      },
      password: {
        value: "",
        isTouched: false,
      },
      reEnterPassowrd: {
        value: "",
        isTouched: false,
      },
    },
    showAlert: false,
    alertTiltle: "",
    alertType: "",
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

  onSubmitHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      mobileNumber: this.state.mobileNumber,
      password: this.state.password,
    };

    axios
      .post(constants.BASE_URL + "/user/signUp", userData)
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
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      reEnterPassowrd: "",
    };

    switch (key) {
      case "name":
        if (formValidation.isEmpty(value) && isTouched) {
          validForm = false;
          if (formValidation.isEmpty(errorMessages.name)) {
            errorMessages.name = "Name is required";
          }
        }
        break;
      case "email":
        if (formValidation.isEmpty(value) && isTouched) {
          validForm = false;
          errorMessages.email = "Email is required";
        } else if (!formValidation.validEmail(value) && isTouched) {
          validForm = false;
          errorMessages.email = "Invalid email format";
        }
        break;
      case "mobileNumber":
        if (formValidation.isEmpty(value) && isTouched) {
          validForm = false;
          errorMessages.mobileNumber = "Mobile number is required";
        } else if (!formValidation.validMobileNumber(value) && isTouched) {
          validForm = false;
          errorMessages.mobileNumber = "Invalid mobile number format";
        }
        break;
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
      case "reEnterPassowrd":
        if (
          !formValidation.passwordMatches(this.state.password, value) &&
          isTouched
        ) {
          validForm = false;
          errorMessages.reEnterPassowrd = "Passwords are not same";
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

  checkInputValid = (id, obj) => {
    const { value, isTouched } = obj.error[id];
    return formValidation.isEmpty(value) && isTouched;
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

  alertTimeOut = () => {
    setTimeout(() => {
      this.setState({ ...this.state, showAlert: false });
      if (this.state.alertType === constants.SUCCESS) {
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

  getCssClasses = (...arr) => {
    return arr.join(" ");
  };

  render() {
    const {
      name,
      email,
      mobileNumber,
      password,
      reEnterPassowrd,
      validForm,
    } = this.state;
    const error = this.state.error;

    return (
      <Fragment>
        {this.renderTopBar()}
        {this.renderAlert()}
        <div className={classes.signIn}>
          <form onSubmit={(event) => this.onSubmitHandler(event)}>
            <div className="mb-3">
              <label className={classes.header}>Sign Up</label>
              <div className={classes.required}>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={
                      formValidation.isEmpty(error["name"].value)
                        ? "form-control"
                        : this.getCssClasses("form-control", classes.error)
                    }
                    id="name"
                    value={name}
                    onChange={(event) => {
                      this.formOnChangeHandler(event);
                    }}
                  />
                  {this.renderInvalid("name")}
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={
                      formValidation.isEmpty(error["email"].value)
                        ? "form-control"
                        : this.getCssClasses("form-control", classes.error)
                    }
                    id="email"
                    value={email}
                    aria-describedby="emailHelp"
                    onChange={(event) => {
                      this.formOnChangeHandler(event);
                    }}
                  />
                  {this.renderInvalid("email")}
                </div>

                <div className="mb-3">
                  <label for="mobileNumber" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className={
                      formValidation.isEmpty(error["mobileNumber"].value)
                        ? "form-control"
                        : this.getCssClasses("form-control", classes.error)
                    }
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(event) => {
                      this.formOnChangeHandler(event);
                    }}
                  />
                  {this.renderInvalid("mobileNumber")}
                </div>

                <div className="mb-3">
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
                      formValidation.isEmpty(error["reEnterPassowrd"].value)
                        ? "form-control"
                        : this.getCssClasses("form-control", classes.error)
                    }
                    id="reEnterPassowrd"
                    value={reEnterPassowrd}
                    onChange={(event) => {
                      this.formOnChangeHandler(event);
                    }}
                  />
                  {this.renderInvalid("reEnterPassowrd")}
                </div>
                <div className={classes.signUpBtn}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!validForm}
                  >
                    Sign-Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
