import React, { Component } from "react";
import "../Users/User.css";
import * as api from "../api";
import { Redirect } from "react-router-dom";
// import propTypes from "prop-types";

class User extends Component {
  state = {
    user: {},
    badRequest: false
  };

  render() {
    console.log(this.state);
    const user = this.state.user;
    return this.state.badRequest ? (
      <Redirect to="/400" />
    ) : (
      <div className="user-card" key={user._id}>
        <img src={user.avatar_url} className="user-avatar" alt="avatar" />
        <p className="user-username">{user.username}</p>
        <p className="user-name">{user.name}</p>
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

// User.propTypes = {
//   handleVoteArticleClick: propTypes.func,
//   badRequest: propTypes.bool
// };

export default User;
