import React, { Component } from "react";
import "../Comments/Comments.css";
import "../Articles/Articles.css";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import * as api from "../api";
import propTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    err404: false
  };

  render() {
    return this.state.err404 ? (
      <Redirect to="/404" />
    ) : (
      <div>
        {this.state.articles.map((article) => {
          const articleId = article._id;
          return (
            <div className="articles-card" key={articleId}>
              <div className="articles-card-container">
                <Link to={`/articles/${articleId}/comments`}>
                  <p className="articles-title">{article.title}</p>
                  <p className="article-username">
                    {article.created_by.username} -
                    {moment(moment(article.created_at)).fromNow()}
                  </p>
                  <p className="article-comments">
                    Comments({article.comments})
                  </p>
                </Link>
                <p className="article-vote">Votes: {article.votes}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount = async () => {
    this.props.topicId
      ? this.fetchArticlesByTopicId()
      : this.fetchAllArticles();
  };

  componentDidUpdate = async (prevProps) => {
    const articleTopic = this.props.match.params.topic_id;
    if (articleTopic !== prevProps.match.params.topic_id)
      this.fetchArticlesByTopicId();
  };

  //articles sorted by popularity
  fetchAllArticles = async () => {
    await api
      .getAllArticles()
      .then((res) => {
        const articles = res.data.articles;
        const topArticles = [...articles].sort((a, b) => {
          return b.votes - a.votes;
        });
        this.setState({
          articles: topArticles
        });
      })
      .catch((err) => {
        this.setState({
          err404: true
        });
      });
  };

  fetchArticlesByTopicId = async () => {
    const topicId = this.props.match.params.topic_id;
    await api
      .getArticlesByTopicId(topicId)
      .then((res) => {
        const articles = res.data.articles;
        this.setState({
          articles: articles
        });
      })
      .catch((err) => {
        this.setState({
          err404: true
        });
      });
  };
}

Articles.propTypes = {
  componentDidMount: propTypes.func
};

export default Articles;
