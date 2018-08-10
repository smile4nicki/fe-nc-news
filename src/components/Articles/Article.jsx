import React, { Component } from "react";
import "../Articles/Articles.css";
import * as api from "../api";
import { Redirect, Link } from "react-router-dom";
import propTypes from "prop-types";
import moment from "moment";
import Votes from "../Votes/Votes.jsx";

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
      <p>Loading...</p>
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
        <Votes article={article} handleVoteClick={this.handleVoteClick} />
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

  handleVoteClick = (direction) => {
    const { article } = this.state;
    let voteCount = article.votes;
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
  badRequest: propTypes.bool,
  articleId: propTypes.string
};

export default Article;
