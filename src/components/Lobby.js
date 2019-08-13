import React, { Component } from 'react';

class Lobby extends Component {

  state = {
    game: {}
  }

  checkGameFull = (gameData) => {
    if(gameData.msg){
      console.log("Not full")
    } else {
      // debugger
      this.props.history.push('/drone')
    }
  }

  pollDrones = () => {
    const user = this.props.userData
    console.log(user.id)
    fetch('http://localhost:3000/poll-drone', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(gameData => this.checkGameFull(gameData))
  }
    
  componentDidMount(){
    if(this.state.game){
      this.interval = setInterval(() => this.pollDrones(), 5000);
    } else {
      this.props.history.push('/drone')
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //delete game search 
  }
  

  render() {
    return (
      <div className="Lobby">
        Waiting for player
      </div>
    );  
  }
}

export default Lobby;

