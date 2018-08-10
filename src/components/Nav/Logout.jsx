import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      <div>
        {console.log("hi!")}
        <button
          className="logout-btn"
          onClick={() => this.props.handleLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }
}
export default Logout;
