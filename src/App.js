import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './LoginPage.js'
import SignupPage from './SignupPage.js'
import HomePage from './HomePage.js'

class App extends Component {
  
  state = {
    // page: 'login'
    user: {}
  }

  render() {
    return (
      <BrowserRouter>      
        <Switch className="App">
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/home" component={HomePage} />
            <Route exact path="/" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

