import React from "react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div>
      <h2>
        There are no articles here! Try again at
        <Link to="/"> articles</Link>?
      </h2>
    </div>
  );
}

export default Error404;
