import React, { Component } from "react";
import classes from "./Login.module.css";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {
  render() {
    return (
      <div className={classes.login}>
        <form>
          <div class="mb-3">
            <label className={classes.header}>Sign In</label>
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />

            <div class="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
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
