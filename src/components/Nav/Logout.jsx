import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      <div>
        <button
          className="logout-btn"
          onClick={() => this.props.handleLogOutClick()}
        >
          Logout
        </button>
      </div>
    );
  }
}
export default Logout;
