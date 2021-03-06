import React, { Component } from "react";
import Error404 from "./components/ErrorHandling/Error404";
import Error400 from "./components/ErrorHandling/Error400";
import Error401 from "./components/ErrorHandling/Error401";
import Nav from "./components/Nav/Nav.jsx";
import Articles from "./components/Articles/Articles.jsx";
import Users from "./components/Users/Users.jsx";
import User from "./components/Users/User.jsx";
import Article from "./components/Articles/Article.jsx";
import Comments from "./components/Comments/Comments.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    activeUser: {}
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Nav
            handleActiveUser={this.handleActiveUser}
            activeUser={this.state.activeUser}
            handleLogOutClick={this.handleLogOutClick}
          />
          <Route exact path="/" component={Articles} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/:username" component={User} />
          <Route
            path="/topics/:topic_id/articles"
            render={({ match }) => (
              <Articles activeUser={this.state.activeUser} match={match} />
            )}
          />
          <Route path="/articles/:article_id" component={Article} />
          <Route
            path="/articles/:article_id"
            render={({ match }) => (
              <Comments activeUser={this.state.activeUser} match={match} />
            )}
          />
          <Route path="/404" component={Error404} />
          <Route path="/400" component={Error400} />
          <Route path="/401" component={Error401} />
        </div>
      </Router>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeUser !== prevState.activeUser) {
      if (this.state.activeUser) {
        sessionStorage.setItem(
          "activeUser",
          JSON.stringify(this.state.activeUser)
        );
      } else {
        sessionStorage.removeItem("activeUser");
      }
    }
  }
  componentDidMount() {
    const activeUser = JSON.parse(sessionStorage.getItem("activeUser"));
    if (activeUser) {
      this.setState({ activeUser });
    }
  }

  handleActiveUser = (user) => {
    this.setState({
      activeUser: user
    });
  };

  handleLogOutClick = () => {
    this.setState({
      activeUser: {}
    });
  };
}

export default App;
