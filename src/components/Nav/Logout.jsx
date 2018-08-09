import React, { Component } from "react";

class Logout extends Component {
  render() {
    return (
      <div>
        <button className="logout-btn" onClick={this.handleLogoutClick}>
          Logout
        </button>
      </div>
    );
  }

  handleLogoutClick = (event) => {
    event.preventDefault();
    this.props.activeUser = {};
  };
}
export default Logout;
