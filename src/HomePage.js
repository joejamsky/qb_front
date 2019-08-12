import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './css/home-page.css'

class HomePage extends Component {

  handleLogout = () => {
    localStorage.clear()
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    }
  }

  render () {
    
    return (
      <div className="HomePage">
        <header>
          <h1>Welcome {this.props.userData.username}</h1> 
          <Link onClick={this.handleLogout} className="logout" to="/login">Logout</Link>
        </header>
        <div className="Menu-button">
          <Link className="Profile" to="/profile">Profile</Link>
        </div>
        <div className="Menu-button"> 
          <Link className="Matches" to="/matches">Matches</Link>
        </div>
        <div className="Menu-button"> 
          <Link className="Game" to="/game">Game</Link>
        </div>
      </div>
    )
  }
}

export default HomePage;
