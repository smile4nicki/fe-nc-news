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
    badRequest: false
  };

  render() {
    const comment = this.props;
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
        <Votes votes={comment.votes} commentId={comment.commentId} />
        <button
          className="comment-delete-button"
          onClick={() => this.handleCommentDeleteClick(comment.commentId)}
        >
          Delete
        </button>
      </div>
    );
  }

  handleCommentDeleteClick = async (commentId) => {
    await api.deleteComment(commentId);
    const newComments = this.state.comments.filter((comment) => {
      return comment._id !== commentId;
    });
    this.setState({
      comments: newComments
    });
  };
}

Comment.propTypes = {
  badRequest: propTypes.bool
};

export default Comment;
