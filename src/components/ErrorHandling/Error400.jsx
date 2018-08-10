import React from "react";
import { Link } from "react-router-dom";
import "./ErrorHandling.css";

function Error400(props) {
  return (
    <div className="error-handling">
      <i className="fas fa-map-signs fa-pull-left fa-7x" />
      <p className="error-message">
        You appear to be lost, there are no {props.location.state.from} here!
      </p>
      {props.location.state.from === "articles" ? (
        <span className="error-message">
          Click the link to <Link to="/">articles</Link> and try again.
        </span>
      ) : props.location.state.from === "comments" ? (
        <span className="error-message">
          Click the link to <Link to="/">comments</Link> and try again.
        </span>
      ) : props.location.state.from === "comments posted" ? (
        <span className="error-message">
          You must log in to post a comment. Please
          <Link to="/articles/:article_id"> login</Link> and try again.
        </span>
      ) : null}
    </div>
  );
}
export default Error400;
