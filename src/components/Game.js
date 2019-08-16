import React, { Component } from 'react';
import '../css/home-page.css'

class Game extends Component {

  initGameAndLinks = () => {
    let user = this.props.userData
    user.queen = true
    fetch('http://localhost:3000/initGame', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(game => this.props.setGameState(game))
    .then(this.props.setUserState(user))
    .then( this.props.history.push(`/lobby`) )
  }
  
  handleQueenClick = () => {
    this.initGameAndLinks()
  }
  
  handleDroneClick = () => {
    let user = this.props.userData
    user.queen = false
    fetch('http://localhost:3000/join-drone', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => this.checkForGames(data, user))
  }

  checkForGames = (joinResponse, user) => {
    if(joinResponse.message){
    } else {
      this.props.setGameState(joinResponse)
      this.props.setUserState(user)
      this.props.history.push('/lobby')
    }
  }
  
  render() {
    return (
      <div className="Game-Container">
        <h1>Select Role</h1> 
        <div onClick={this.handleQueenClick} className="Menu-button">
          Queen
        </div>
        <div onClick={this.handleDroneClick} className="Menu-button"> 
          Drone
        </div>
      </div>
    );  
  }
}

export default Game;

