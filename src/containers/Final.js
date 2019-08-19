import React, { Component } from 'react';

class Final extends Component {

  state = {
    searching: true,
    queen: {},
    drone: {}
  }

  handleFoundChoice = (choiceData) => {
    if(choiceData.error){
      console.log(choiceData.error)
    } else {
      clearInterval(this.interval);
      this.setState({
        searching: false,
        queen: choiceData.queen,
        drone: choiceData.drone
      })
    }
  }

  checkChoice = () => {
    const id = this.props.gameData.id
    fetch(`http://localhost:3000/pollChoice/${id}`)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(choiceData => this.handleFoundChoice(choiceData))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkChoice(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // debugger
    return (
      <div className="Final">
        { this.state.searching ? (
          <h1>WHO JELLY?</h1>
        ) : (
          <div className="winners-circle">
            <h1>THESE TWO JELLY</h1>
            <div>{this.state.queen.username}</div>
            <p> loooooooovess </p>
            <div>{this.state.drone.username}</div>
          </div>
        )}
      </div>
    );  
  }
}

export default Final;