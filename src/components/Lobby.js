import React, { Component } from 'react';

class Lobby extends Component {

  checkGameFull = (gameReady) => {

    if(gameReady.bool === "true"){

      if(this.props.userData.queen === true){
        this.props.history.push('/queen')
      } else {
        this.props.history.push('/drone')
      }
      
    }
  }

  pollLobby = () => {
    const user = this.props.userData
    const game = this.props.gameData
    fetch('http://localhost:3000/pollLobby', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
          user: user,
          game: game
        })
    })
    .then(res => res.json())
    .then(gameData => this.checkGameFull(gameData))
  }
    
  componentDidMount(){
    this.interval = setInterval(() => this.pollLobby(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  

  render() {
    return (
      <div className="Lobby">
        <p>Hi {this.props.userData.username}</p>
        <p> Waiting for other players</p>
      </div>
    );  
  }
}

export default Lobby;

