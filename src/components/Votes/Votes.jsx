import React, { Component } from "react";
import propTypes from "prop-types";

class Votes extends Component {
  state = {
    votes: false
  };

  render() {
    return (
      <div>
        <button
          ref="btnUp"
          className="vote-up"
          label="up"
          onClick={() => this.props.handleVoteClick("up")}
        >
          <i className="far fa-smile" />
        </button>
        <button
          ref="btnDown"
          className="vote-down"
          label="down"
          onClick={() => this.props.handleVoteClick("down")}
        >
          <i className="far fa-angry" />
        </button>
      </div>
    );
  }
}

Votes.propTypes = {
  handleVoteClick: propTypes.func
};

export default Votes;
