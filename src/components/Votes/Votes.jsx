import React from "react";
import propTypes from "prop-types";

const Votes = (props) => {
  return (
    <div>
      <button
        className="vote-up"
        label="up"
        onClick={() => props.handleVoteClick("up")}
      >
        <i className="far fa-smile" />
      </button>
      <button
        className="vote-down"
        label="down"
        onClick={() => props.handleVoteClick("down")}
      >
        <i className="far fa-angry" />
      </button>
    </div>
  );
};

Votes.propTypes = {
  handleVoteClick: propTypes.func
};

export default Votes;
