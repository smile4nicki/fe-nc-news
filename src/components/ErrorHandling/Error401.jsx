import React from "react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <div className="login-input-error">
      <h2>
        User not found! Please choose one of the following names and login
        <Link to="/users">Users</Link>
        page
      </h2>
    </div>
  );
};

export default Error401;
