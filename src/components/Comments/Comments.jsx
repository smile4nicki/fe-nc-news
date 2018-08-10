import React, { Component } from "react";
import "../Articles/Articles.css";
import "../Comments/Comments.css";
import moment from "moment";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";
import Comment from "../Comments/Comment.jsx";

class Comments extends Component {
  state = {
    comments: [],
    newComment: "",
    badRequest: false
  };
  render() {
    return this.state.badRequest ? (
      <Redirect to={{ pathname: "/400", state: { from: "comments posted" } }} />
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
              onClick={this.handleNewCommentSubmitClick}
            />
          </form>
        </React.Fragment>
        {this.state.comments.map((comment) => {
          return !comment.created_by ? (
            <p> Loading...</p>
          ) : (
            <div className="comments-card" key={comment._id}>
              <Comment
                commentId={comment._id}
                commentBody={comment.body}
                commentUsername={comment.created_by.username}
                created_at={comment.created_at}
                votes={comment.votes}
              />
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount = async () => {
    this.fetchCommentsByArticleId();
  };

  //comments sorted by date - most recent at the top
  fetchCommentsByArticleId = async () => {
    const articleId = this.props.match.params.article_id;
    await api
      .getCommentsByArticleId(articleId)
      .then((res) => {
        const comment = res.data.comment;
        const topComments = [...comment].sort((a, b) => {
          return moment(b.created_at) - moment(a.created_at);
        });
        this.setState({
          comments: topComments
        });
      })
      .catch((err) => {
        this.setState({
          badRequest: true
        });
      });
  };

  handleCommentChange = (event) => {
    this.setState({
      newComment: event.target.value
    });
  };

  handleNewCommentSubmitClick = async (event) => {
    const articleId = this.props.match.params.article_id;
    event.preventDefault();
    let comment = {
      body: this.state.newComment,
      created_by: this.props.activeUser._id
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
}

Comments.propTypes = {
  handleCommentSubmitClick: propTypes.func,
  badRequest: propTypes.bool
};

export default Comments;
