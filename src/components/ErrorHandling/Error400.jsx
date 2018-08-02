import React from "react";
import { Link } from "react-router-dom";

function Error400() {
  return (
    <div className="error-handling">
      <h2>
        Sorry we couldn't do that! Please return to
        <Link to="/"> articles</Link> and try again.
      </h2>
    </div>
  );
}

export default Error400;
