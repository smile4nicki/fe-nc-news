import React, { Component } from "react";
import "../Articles/Articles.css";
import * as api from "../api";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";
import moment from "moment";

class Article extends Component {
  state = {
    article: {},
    badRequest: false
  };

  render() {
    const article = this.state.article;
    return this.state.badRequest ? (
      <Redirect to="/400" />
    ) : !this.state.article.created_by ? (
      <p>Loading</p>
    ) : (
      <div className="article-card" key={article._id}>
        <p className="article-title">{article.title}</p>
        <p className="article-body">{article.body}</p>
        <p className="article-username">
          <Link to={`/users/${article.created_by.username}`}>
            {article.created_by.username}
          </Link>
          - {moment(moment(article.created_at)).fromNow()}
        </p>
        <p className="article-vote">Votes: {article.votes}</p>
        <button
          ref="btnArticleUp"
          className="vote-up"
          label="up"
          onClick={() => this.handleVoteArticleClick("up")}
        >
          <i className="far fa-smile" />
        </button>
        <button
          ref="btnArticleDown"
          className="vote-down"
          label="down"
          onClick={() => this.handleVoteArticleClick("down")}
        >
          <i className="far fa-angry" />
        </button>
      </div>
    );
  }

  componentDidMount = async () => {
    this.fetchArticleByArticleId();
  };

  fetchArticleByArticleId = async () => {
    const articleId = this.props.match.params.article_id;
    await api
      .getArticleByArticleId(articleId)
      .then((res) => {
        const article = res.data.article;
        this.setState({
          article: article
        });
      })
      .catch((err) => {
        this.setState({
          err404: true
        });
      });
  };

  handleVoteArticleClick = (direction) => {
    const { article } = this.state;
    this.refs.btnArticleUp.setAttribute("disabled", "disabled");
    this.refs.btnArticleDown.setAttribute("disabled", "disabled");
    let voteCount = this.state.article.votes;
    api.voteOnArticle(article._id, direction).then((res) => {
      if (direction === "up") {
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
  };
}

Article.propTypes = {
  handleVoteArticleClick: propTypes.func,
  badRequest: propTypes.bool
};

export default Article;
