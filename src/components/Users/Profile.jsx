import React, { Component } from "react";
import "./Profile/Profile.css";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import * as api from "../api";
import propTypes from "prop-types";

class Profile extends Component {
  state = {
    username: [],
    err400: false
  };

  render() {
    return this.state.err400 ? (
      <Redirect to="/400" />
    ) : (
      <div id="id01" className="modal">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span
              onclick="document.getElementById('id01').style.display='none'"
              class="close"
              title="Close Modal"
            />
            <img src={logo} alt="Avatar" className="avatar" />
          </div>

          <div class="container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
