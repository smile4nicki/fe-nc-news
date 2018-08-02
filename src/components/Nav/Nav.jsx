import React, { Component } from "react";
import "../Nav/Nav.css";
import { Redirect, Link } from "react-router-dom";
import logo from "../logo.png";
// import moment from "moment";
import * as api from "../api";
import propTypes from "prop-types";

class Articles extends Component {
  state = {
    topics: [],
    users: [],
    err404: false
  };

  render() {
    return this.state.err404 ? (
      <Redirect to="/404" />
    ) : (
      <div className="nav-card">
        <div className="nav-card-container">
          <Link to="/">
            <img src={logo} className="nav-logo" alt="logo" />
          </Link>
          <div className="dropdown">
            <button className="dropbtn">
              <i className="fa fa-bars" /> Topics
            </button>
            <div className="dropdown-content">
              {this.state.topics.map((topic) => {
                return (
                  <Link to={`/topics/${topic._id}/articles`}>
                    <ul>
                      <li className="list-item">{topic.slug}</li>
                    </ul>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    this.fetchAllTopics();
  };

  fetchAllTopics = async () => {
    await api
      .getAllTopics()
      .then((res) => {
        const topics = res.data.topic;
        this.setState({
          topics: topics
        });
      })
      .catch((err) => {
        this.setState({
          err404: true
        });
      });
  };
}

Articles.propTypes = {
  componentDidMount: propTypes.func
};

export default Articles;
