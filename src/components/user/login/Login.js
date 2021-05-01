import axios from "axios";
import React, { Component } from "react";
import classes from "./Login.module.css";
import * as constants from "../../../util/constant";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
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
      .post( constants.BASE_URL + "/user/login", authData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error is : ", error.response);
      });
  };

  render() {
    const { email, password } = this.state;

    return (
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
