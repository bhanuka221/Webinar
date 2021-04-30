import axios from "axios";
import React, { Component } from "react";
import classes from "./SignIn.module.css";

export default class SignIn extends Component {
  state = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    reEnterPassowrd: "",
  };

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
      .post("http://localhost:3001/api/user/signUp", userData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error is : ",error.response);
      });
  };

  formOnChangeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const { name, email, mobileNumber, password, reEnterPassowrd } = this.state;

    return (
      <div className={classes.signIn}>
        <form onSubmit={(event) => this.onSubmitHandler(event)}>
          <div className="mb-3">
            <label className={classes.header}>Sign Up</label>

            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                aria-describedby="emailHelp"
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={"form-control " + classes.error}
                id="password"
                value={password}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
              <span className={classes.errorSpan}>Password not strong</span>
            </div>

            <div className="mb-3">
              <label for="reEnter" className="form-label">
                Re-enter Password
              </label>
              <input
                type="password"
                className="form-control"
                id="reEnterPassowrd"
                value={reEnterPassowrd}
                onChange={(event) => {
                  this.formOnChangeHandler(event);
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
