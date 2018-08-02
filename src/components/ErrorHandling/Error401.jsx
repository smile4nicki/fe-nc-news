import React from "react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <div className="content box error">
      <h2>
        User not found! Please try again at the<Link to="/users">login</Link>
        page
      </h2>
    </div>
  );
};

export default Error401;
