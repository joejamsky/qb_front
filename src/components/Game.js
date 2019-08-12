import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/home-page.css'

class Game extends Component {

  handleLogout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <div className="Game-Container">
        <header>
          <h1>Select Role</h1> 
          <Link onClick={this.handleLogout} className="logout" to="/login">Logout</Link>
          <Link className="home-link" to="/home">Home</Link>
        </header>
        <div className="Menu-button">
          <Link className="Queen-button" to="/queen">Queen</Link>
        </div>
        <div className="Menu-button"> 
          <Link className="Drone-Button" to="/drone">Drone</Link>
        </div>
      </div>
    );  
  }
}

export default Game;

