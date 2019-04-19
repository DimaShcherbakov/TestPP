import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Redirect from="/" to="/articles" />
    );
  }
}

export default App;
