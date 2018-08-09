import axios from "axios";

export const getAllTopics = () => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/topics/`
  );
};

export const getArticlesByTopicId = async (topicId) => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/topics/${topicId}/articles/`
  );
};

export const getAllArticles = () => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/articles/`
  );
};

export const getArticleByArticleId = async (articleId) => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/articles/${articleId}`
  );
};

export const getCommentsByArticleId = async (articleId) => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/articles/${articleId}/comments`
  );
};

export const voteOnArticle = async (articleId, direction) => {
  return axios.put(
    `https://nichola-northcoders-news.herokuapp.com/api/articles/${articleId}?vote=${direction}`
  );
};

export const voteOnComment = async (commentId, direction) => {
  return axios.put(
    `https://nichola-northcoders-news.herokuapp.com/api/comments/${commentId}?vote=${direction}`
  );
};

export const postComment = (comment, articleId) => {
  return axios
    .post(
      `https://nichola-northcoders-news.herokuapp.com/api/articles/${articleId}/comments`,
      comment
    )
    .then((res) => {
      return res.data.comment;
    });
};

export const deleteComment = (commentId) => {
  return axios.delete(
    `https://nichola-northcoders-news.herokuapp.com/api/comments/${commentId}`
  );
};

export const login = ({ username }) => {
  return axios
    .get(`https://nichola-northcoders-news.herokuapp.com/api/users/${username}`)
    .then((res) => {
      return res.data.user;
    });
};

export const getAllUsers = () => {
  return axios.get(`https://nichola-northcoders-news.herokuapp.com/api/users`);
};

export const getUsersByUsername = (username) => {
  return axios.get(
    `https://nichola-northcoders-news.herokuapp.com/api/users/${username}`
  );
};
