import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./containers/MainPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/bootstrap.less";
import Header from "./components/Header";
import EditPage from "./containers/EditPage";
import CreatePage from "./containers/CreatePage";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <div className="container px-2">
      <Header />
      <Router>
        <Route exact path="/" component={App} />
        <Route exact path="/articles" component={MainPage} />
        <Route path="/articles/:id/edit" component={EditPage} />
        <Route path="/articles/create" component={CreatePage} />
        {/* <Route path="/articles/" component={MainPage} /> */}
      </Router>
    </div>
  </Provider>,
  document.getElementById("root")
);
