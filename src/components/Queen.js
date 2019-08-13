import React, { Component } from 'react';

class Queen extends Component {

  constructor(props){
    super(props)
    this.state = {
      game: {},
      drones: {},
      searching: true, 
      answers: []
    }
  }

  checkGameFull = (gameData) => {
    // debugger
    if(gameData.message){
      console.log(gameData.message)
    } else {
      this.setState({ 
        game: gameData.game,
        drones: gameData.drone
      })
      console.log(" game ready ")
      clearInterval(this.interval);
      this.setState({
        searching: false
      })
    }
  }

  printDrones = () => {
    return (
      <div>
        {this.state.drones.username}
      </div>
    )
  }

  pollGameLobby = () => {
    const user = this.props.userData
    console.log(user.id)
    fetch('http://localhost:3000/poll-queen', {
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
    if(this.state.searching === true){
      this.interval = setInterval(() => this.pollGameLobby(), 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //delete game search 
  }

  render() {
    // debugger
    return (
      <div className="Queen">
        { this.state.searching ? (
          "Waiting for drones. One sec."
        ) : (
          this.printDrones()
        )}
      </div>
    );  
  }
}

export default Queen;

