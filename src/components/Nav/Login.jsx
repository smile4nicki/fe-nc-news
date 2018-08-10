import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import * as api from "../api";
import propTypes from "prop-types";

class Login extends Component {
  state = {
    username: "",
    err404: false
  };

  render() {
    return this.state.err404 ? (
      <Redirect to="/404" />
    ) : (
      <form>
        <div className="login-container">
          <b>Username </b>
          <input
            type="text"
            className="input-box"
            placeholder="Enter Username"
            name="username"
            required
            onChange={this.handleUsernameChange}
            value={this.state.username}
          />
          <button
            className="login-btn"
            type="submit"
            onClick={this.handleLoginClick}
          >
            Login
          </button>
        </div>
      </form>
    );
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  handleLoginClick = (event) => {
    event.preventDefault();
    api
      .login({
        username: this.state.username
      })
      .then((activeUser) => {
        this.props.handleActiveUser(activeUser);
      });
  };
}

Login.propTypes = {
  err404: propTypes.bool,
  handleActiveUser: propTypes.func
};

export default Login;
