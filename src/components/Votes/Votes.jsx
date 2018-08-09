import React, { Component } from "react";
import propTypes from "prop-types";
import * as api from "../api";

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
          // onClick={() => props.handleVoteClick("up")}
        >
          <i className="far fa-smile" />
        </button>
        <button
          ref="btnDown"
          className="vote-down"
          label="down"
          // onClick={() => props.handleVoteClick("down")}
        >
          <i className="far fa-angry" />
        </button>
      </div>
    );
  }

  handleVoteClick = (props) => {
    this.refs.btnUp.setAttribute("disabled", "disabled");
    this.refs.btnDown.setAttribute("disabled", "disabled");
    let voteCount = this.props.votes;
    if (this.props.articleId) {
      api.voteOnArticle(this.props.articleId).then((res) => {
        if (props === "up") {
          voteCount++;
        } else {
          voteCount--;
        }
        this.setState({
          article: {
            ...this.state.article,
            votes: voteCount
          }
        });
      });
    }
    if (this.props.commentId) {
      api.voteOnComment(this.props.commentId).then((res) => {
        if (props === "up") {
          voteCount++;
        } else {
          voteCount--;
        }
        this.setState({
          comment: {
            ...this.state.comment,
            votes: voteCount
          }
        });
      });
    }
  };
  // if(props.comment) {
  //   return (
  //     <div>
  //       <button
  //         onClick={() => {
  //           props.handleVote("up", props.comment);
  //         }}
  //         className="vote-up-button"
  //       >
  //         Vote Up
  //       </button>
  //       <button
  //         onClick={() => {
  //           props.handleVote("down", props.comment);
  //         }}
  //         className="vote-down-button"
  //       >
  //         Vote Down
  //       </button>
  //     </div>
  //   );
  // } else if(props.article) {
  //   return (
  //     <div>
  //       <button
  //         onClick={() => {
  //           props.handleVote("up");
  //         }}
  //         className="vote-up-button"
  //       >
  //         Vote Up
  //       </button>
  //       <button
  //         onClick={() => {
  //           props.handleVote("down");
  //         }}
  //         className="vote-down-button"
  //       >
  //         Vote Down
  //       </button>
  //     </div>
  //   );
  // }
}

Votes.propTypes = {
  handleVoteClick: propTypes.func
};

export default Votes;
