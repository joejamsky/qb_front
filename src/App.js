import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoginPage from './components/LoginPage.js'
import SignupPage from './components/SignupPage.js'
import HomePage from './components/HomePage.js'
import MatchesList from './containers/MatchesList.js'
import Game from './components/Game.js'
import Profile from './components/Profile.js'
import Drone from './components/Drone.js'
import Queen from './components/Queen.js'
import Final from './containers/Final.js'
import Lobby from './components/Lobby.js'
import './css/App.css'

class App extends Component {
  
  state = {
    user: {},
    game: {},
    matches: [],
    questions: []
  }

  componentDidMount(){
    if(localStorage.token){
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
  }
  
  fetchGame = () => {
    console.log(this.state.game, "before fetch")
    fetch('http://localhost:3000/usergame', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
    .then(res => res.json())
    .then(data => console.log(data, "after fetch"))
    // .then(gameObj => {
    //   // console.log(gameObj, "game")
    //   if(gameObj.message){
    //     // console.log(gameObj.message)
    //   } else {
    //     this.setState({
    //       game: gameObj
    //     })
    //   }
    // })
  }

  setUserState = (userData) => {
    this.setState({
      user: userData
    })
  }

  setGameState = (gameData) => {

    this.setState({
      game: gameData.game,
      questions: gameData.questions,
    })
    console.log(this.state.game, "set state")
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      user: {},
      game: {},
      matches: [],
      questions: []
    })
    
  }

  render() {
    return (
      <BrowserRouter>      
        <header> 
          { localStorage.token ? (
            <div>
              <Link className="home-link" to="/home">Home</Link>
              <span>Welcome {this.state.user.username}</span> 
              <Link onClick={this.handleLogout} className="logout" to="/login">Logout</Link>
            </div>
          ) : (
            <div>
              <Link className="signup" to="/signup">Sign Up</Link>
              <Link className="login" to="/login">Login</Link>
            </div>
          )}
        </header> 
        <Switch className="App">
          {/* <div className="switch-container"> */}
            <Route path="/login" render={(routerProps) => <LoginPage {...routerProps} setUserState={this.setUserState} /> } />
            <Route path="/signup" render={(routerProps) => <SignupPage {...routerProps} setUserState={this.setUserState} /> } />
       
            <Route path="/home" render={(routerProps) => <HomePage {...routerProps} userData={this.state.user} /> } />
            <Route path="/profile" render={(routerProps) => <Profile {...routerProps} userData={this.state.user} setUserState={this.setUserState} /> } />
            <Route path="/matches" render={(routerProps) => <MatchesList {...routerProps} userData={this.state.user} /> } />

            <Route path="/game"  render={(routerProps) => <Game {...routerProps} userData={this.state.user} gameData={this.state.game} setGameState={this.setGameState} setUserState={this.setUserState} /> } />         
            <Route path="/queen" render={(routerProps) => <Queen {...routerProps} userData={this.state.user} gameData={this.state.game} setUserState={this.setUserState} /> } />
            <Route path="/drone" render={(routerProps) => <Drone {...routerProps} userData={this.state.user} gameData={this.state.game} questionData={this.state.questions} setUserState={this.setUserState} /> } />
            <Route path="/lobby" render={(routerProps) => <Lobby {...routerProps} userData={this.state.user} gameData={this.state.game} /> } />
            <Route path="/final" render={(routerProps) => <Final {...routerProps} gameData={this.state.game} /> }  />
           
            <Route exact path="/" render={(routerProps) => <LoginPage {...routerProps} setUserState={this.setUserState} /> } />        
          {/* </div> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

