import React, { Component } from "react";
import "../Comments/Comments.css";
import * as api from "../api";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";
import moment from "moment";
import Votes from "../Votes/Votes.jsx";

class Comment extends Component {
  state = {
    comment: {},
    badRequest: false
  };

  render() {
    console.log(this.props);
    const comment = this.state.comment;
    return this.state.badRequest ? (
      <Redirect to={{ pathname: "/400", state: { from: "comments" } }} />
    ) : (
      <div className="comments-card" key={comment.commentId}>
        <p className="comments-body">{comment.commentBody}</p>
        <p className="article-username">
          <Link to={`/users/${comment.username}`}>
            {comment.commentUsername}
          </Link>
          - {moment(moment(this.props.created_at)).fromNow()}
        </p>
        <p className="comments-votes">Votes: {comment.votes}</p>
        <Votes votes={comment} handleVoteClick={this.handleVoteClick} />
        <button
          className="comment-delete-button"
          onClick={() => this.props.handleCommentDeleteClick(comment.commentId)}
        >
          Delete
        </button>
      </div>
    );
  }

  componentDidMount = async () => {
    this.handleComment();
  };

  handleComment = () => {
    this.setState({
      comment: this.props
    });
  };

  handleVoteClick = (direction) => {
    const { comment } = this.state;
    let voteCount = comment.votes;
    api.voteOnComment(comment.commentId, direction).then((res) => {
      if (direction === "up") {
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
  };
}

Comment.propTypes = {
  badRequest: propTypes.bool,
  handleCommentDeleteClick: propTypes.func
};

export default Comment;
