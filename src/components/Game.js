import React, { Component } from 'react';
import '../css/home-page.css'

class Game extends Component {

  handleQueenClick = () => {
    let user = this.props.userData
    fetch('http://localhost:3000/games', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then( this.props.history.push(`/queen`) )

  }

  checkForGames = (pollResponse) => {
    if(pollResponse.message){
      console.log("No Queens")
    } else {
      this.props.history.push('/lobby')
    }
  }

  handleDroneClick = () => {
    let user = this.props.userData
    fetch('http://localhost:3000/join-drone', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => this.checkForGames(data))
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

