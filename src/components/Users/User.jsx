import React, { Component } from "react";
import "../Users/User.css";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";
import Articles from "../Articles/Articles.jsx";

class User extends Component {
  state = {
    user: {},
    badRequest: false
  };

  render() {
    const user = this.state.user;
    return this.state.badRequest ? (
      <Redirect to={{ pathname: "/401", state: { from: "article" } }} />
    ) : (
      <div className="user-card" key={user._id}>
        <div className="user-card-container">
          <img src={user.avatar_url} className="user-avatar" alt="avatar" />
          <p className="username-font">{user.username}</p>
        </div>
        <Articles />
      </div>
    );
  }
  componentDidMount = async () => {
    this.fetchUsersByUsername();
  };

  fetchUsersByUsername = async () => {
    const username = this.props.match.params.username;
    await api
      .getUsersByUsername(username)
      .then((res) => {
        const user = res.data.user;
        this.setState({
          user: user
        });
      })
      .catch((err) => {
        this.setState({
          err400: true
        });
      });
  };
}

User.propTypes = {
  handleVoteArticleClick: propTypes.func,
  username: propTypes.string,
  badRequest: propTypes.bool
};

export default User;
