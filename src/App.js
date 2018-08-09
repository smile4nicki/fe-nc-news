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
          <Nav />
          <Route exact path="/" component={Articles} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/:username" component={User} />
          <Route exact path="/topics/:topic_id/articles" component={Articles} />
          <Route path="/articles/:article_id" component={Article} />
          <Route path="/articles/:article_id/comments" component={Comments} />
          <Route path="/404" component={Error404} />
          <Route path="/400" component={Error400} />
          <Route path="/401" component={Error401} />
        </div>
      </Router>
    );
  }
  handleActiveUser = (user) => {
    console.log(user);
    this.setState({
      activerUser: user
    });
  };
}

export default App;
