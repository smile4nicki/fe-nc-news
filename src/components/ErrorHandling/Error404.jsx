import React from "react";
import { Link } from "react-router-dom";

function Error404(props) {
  return (
    <div className="error-handling">
      <i class="fas fa-hand-paper fa-pull-left fa-5x" />
      <p className="error-message">
        Page not found, return <Link to="/topics/:topic_id/articles">Home</Link>
      </p>
    </div>
  );
}

export default Error404;
