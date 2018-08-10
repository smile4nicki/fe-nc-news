import React, { Component } from "react";
import "../Comments/Comments.css";
import * as api from "../api";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";
import moment from "moment";
import Votes from "../Votes/Votes.jsx";
// import User from "../Users/User.jsx";

class Comment extends Component {
  state = {
    comment: {},
    badRequest: false
  };

  render() {
    const comment = this.state.comment;
    return this.state.badRequest ? (
      <Redirect to="/400" />
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
          onClick={() => this.handleCommentDeleteClick(comment.commentId)}
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

  handleCommentDeleteClick = async (commentId) => {
    await api.deleteComment(commentId);
    const newComments = this.state.comments.filter((comment) => {
      return comment._id !== commentId;
    });
    this.setState({
      comments: newComments
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
