import React, { Component } from 'react';
import queenbee from '../assets/queenLoading.gif'
import lovebee from '../assets/bee_love.jpg'

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
    .then(choiceData => this.handleFoundChoice(choiceData))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkChoice(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Final">
        { this.state.searching ? (
          <div>
            <h1>Making Jelly</h1>
            <img src={queenbee} alt="boohoo" className="img-responsive"/>
          </div>
        ) : (
          <div className="Winners-Circle">
            <h1>Love Bugs</h1>
            <div className="Final-Queen">

              <img src={this.state.queen.profile_pic} alt="Queen User" />
              <div>{this.state.queen.username}</div>
            </div>
            <img src={lovebee} alt="Hearts" />
            <div className="Final-Drone">
              <img src={this.state.drone.profile_pic} alt="Drone User" />
              <div>{this.state.drone.username}</div>
            </div>
          </div>
        )}
      </div>
    );  
  }
}

export default Final;