import React, { Component } from "react";
import "../Users/Users.css";
import { Redirect, Link } from "react-router-dom";
import * as api from "../api";
import propTypes from "prop-types";

class Users extends Component {
  state = {
    users: [],
    err404: false
  };

  render() {
    return this.state.err404 ? (
      <Redirect to="/404" />
    ) : (
      <div>
        <h1 className="users-title">Users</h1>
        {this.state.users.map((user) => {
          const userId = user._id;
          return (
            <Link to={`/users/${user.username}`}>
              <div className="users-card" key={userId}>
                <div className="users-card-container">
                  <img
                    src={user.avatar_url}
                    className="user-avatar"
                    alt="avatar"
                  />
                  <p className="username-font">{user.username}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
  componentDidMount = async () => {
    this.fetchAllUsers();
  };

  fetchAllUsers = async () => {
    await api
      .getAllUsers()
      .then((res) => {
        const users = res.data.user;
        this.setState({
          users: users
        });
      })
      .catch((err) => {
        this.setState({
          err404: true
        });
      });
  };
}

Users.propTypes = {
  componentDidMount: propTypes.func,
  fetchAllUsers: propTypes.func
};

export default Users;
