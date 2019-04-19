import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './containers/MainPage';
import CreateForm from './containers/CreateForm';


ReactDOM.render(
  <div className="container">
     <Router>
        <Route exact path="/" component={App} />
        <Route path="/articles" component={MainPage} />
        <Route path="/articles/:id/edit" component={} />
        <Route path="/articles/create" component={CreateForm} />
        {/* <Route path="/articles/" component={MainPage} /> */}
      </Router>
  </div>, document.getElementById('root'));

