import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginPage from './components/LoginPage.js'
import SignupPage from './SignupPage.js'
import HomePage from './components/HomePage.js'
import MatchesList from './containers/MatchesList.js'
import Game from './components/Game.js'
import Profile from './components/Profile.js'
import Drone from './components/Drone.js'
import Queen from './components/Queen.js'
import Final from './containers/Final.js'
import Lobby from './components/Lobby.js'

class App extends Component {
  
  state = {
    user: {},
    matches: [],
    questions: [],
    game_questions: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(data => this.setState({
      questions: data
    }))

    fetch('http://localhost:3000/profile',{
      headers:  {
        Authorization: localStorage.token
      }
    })
    .then(res => res.json())
    .then(userObj => {
      this.setState({user: userObj})
    })
  }

  setUserState = (userData) => {
    this.setState({
      user: userData
    })
  }

  selectRandomQuestions() {
    let max_questions = 3
    let allQuestions = this.state.questions
    var randomQuestions = allQuestions.slice(0), i = allQuestions.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = randomQuestions[index];
        randomQuestions[index] = randomQuestions[i];
        randomQuestions[i] = temp;
    }
    return randomQuestions.slice(0, max_questions);
  }

  handleLogout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <BrowserRouter>      
        <header> 
          <Link className="home-link" to="/home">Home</Link>
          <Link onClick={this.handleLogout} className="logout" to="/login">Logout</Link>
          <span>Welcome {this.state.user.username}</span> 
        </header> 
        <Switch className="App">
            <Route path="/login" render={(routerProps) => <LoginPage {...routerProps} setUserState={this.setUserState} /> } />
            <Route path="/signup" render={(routerProps) => <SignupPage {...routerProps} setUserState={this.setUserState} /> } />
            <Route path="/home" render={(routerProps) => <HomePage {...routerProps} userData={this.state.user} /> } />
            <Route path="/matches" render={(routerProps) => <MatchesList {...routerProps} userData={this.state.user} /> } /> />
            <Route path="/game"  render={(routerProps) => <Game {...routerProps} userData={this.state.user} /> } />
            <Route path="/profile" render={(routerProps) => <Profile {...routerProps} userData={this.state.user} setUserState={this.setUserState} /> } />
            <Route path="/queen" render={(routerProps) => <Queen {...routerProps} userData={this.state.user} setUserState={this.setUserState} /> } />
            <Route path="/drone" render={(routerProps) => <Drone {...routerProps} userData={this.state.user} questions={this.selectRandomQuestions()} setUserState={this.setUserState} /> } />
            <Route path="/lobby" render={(routerProps) => <Lobby {...routerProps} userData={this.state.user} /> } />
            <Route path="/final" component={Final} />
            <Route exact path="/" render={(routerProps) => <LoginPage {...routerProps} setUserState={this.setUserState} /> } />        
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

