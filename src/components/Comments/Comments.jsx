import React, { Component } from "react";
import "../Articles/Articles.css";
import "../Comments/Comments.css";
import moment from "moment";
import * as api from "../api";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";

class Comments extends Component {
  state = {
    comments: [],
    newComment: "",
    badRequest: false
  };
  render() {
    return this.state.badRequest ? (
      <Redirect to="/400" />
    ) : (
      <div>
        <React.Fragment>
          <form className="new-comment-whole">
            <input
              type="text"
              className="new-comment"
              placeholder="have your say..."
              value={this.state.newComment}
              onChange={this.handleCommentChange}
            />
            <input
              type="submit"
              value="submit"
              className="comment-submit-button"
              onClick={this.handleCommentSubmitClick}
            />
          </form>
        </React.Fragment>

        {this.state.comments.map((comment) => {
          return (
            <div className="comments-card" key={comment._id}>
              <div className="comments-card-container">
                <p className="comments-body">{comment.body}</p>
                <p className="article-username">
                  <Link to={`/users/${comment.created_by.username}`}>
                    {comment.created_by.username}
                  </Link>
                  - {moment(comment.created_at).fromNow()}
                </p>
                <p className="comments-votes">Votes: {comment.votes}</p>
                <button
                  ref="btnCommentUp"
                  className="vote-up"
                  label="up"
                  onClick={() => this.handleVoteCommentClick("up", comment)}
                >
                  <i className="far fa-smile" />
                </button>
                <button
                  ref="btnCommentDown"
                  className="vote-down"
                  label="down"
                  onClick={() => this.handleVoteCommentClick("down", comment)}
                >
                  <i className="far fa-angry" />
                </button>
                <button
                  className="comment-delete-button"
                  onClick={() => this.handleCommentDeleteClick(comment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount = async () => {
    this.fetchCommentsByArticleId();
  };

  fetchCommentsByArticleId = async () => {
    const articleId = this.props.match.params.article_id;
    await api
      .getCommentsByArticleId(articleId)
      .then((res) => {
        const comment = res.data.comment;
        const topComments = [...comment].sort((a, b) => {
          return b.votes - a.votes;
        });
        this.setState({
          comments: topComments,
          votes: comment.votes
        });
      })
      .catch((err) => {
        this.setState({
          badRequest: true
        });
      });
  };

  handleVoteCommentClick = (direction, commentToVote) => {
    this.refs.btnCommentUp.setAttribute("disabled", "disabled");
    this.refs.btnCommentDown.setAttribute("disabled", "disabled");
    api.voteOnComment(commentToVote._id, direction);
    const voteChange = direction === "up" ? 1 : -1;
    const updatedComments = this.state.comments.map((comment) => {
      console.log(comment);
      if (comment === commentToVote) {
        return {
          ...comment,
          votes: comment.votes + voteChange
        };
      }
      return comment;
    });
    this.setState({ comments: updatedComments });
  };

  handleCommentChange = (event) => {
    this.setState({
      newComment: event.target.value
    });
  };

  handleCommentSubmitClick = async (event) => {
    const articleId = this.props.match.params.article_id;
    event.preventDefault();
    let comment = {
      body: this.state.newComment,
      created_by: "5b48464154670a3395b00d1d" //dont hard code this will come from active user!
    };
    this.setState({
      comments: [...this.state.comments, comment]
    });
    return api.postComment(comment, articleId).catch((err) => {
      this.setState({
        badRequest: true
      });
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
}

Comments.propTypes = {
  handleVoteCommentClick: propTypes.func,
  fetchCommentsByArticleIds: propTypes.func,
  handleCommentClick: propTypes.func,
  handleCommentDelete: propTypes.func,
  badRequest: propTypes.bool
};

export default Comments;
