import React, { Component } from "react";
import Error404 from "./components/ErrorHandling/Error404";
import Error400 from "./components/ErrorHandling/Error400";
import Error401 from "./components/ErrorHandling/Error401";
import Nav from "./components/Nav/Nav.jsx";
import Articles from "./components/Articles/Articles.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from './logo.png';
// import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={Nav} />
          <Route path="/topics/:topic_id/articles" component={Articles} />
          <Route path="/404" component={Error404} />
          <Route path="/400" component={Error400} />
          <Route path="/401" component={Error401} />
        </div>
      </Router>
    );
  }
}

export default App;
