import React, { Component } from 'react';

class Queen extends Component {

  state = {
    game: {},
    drones: [],
    questions: [],
    answers: [{id: 0, content: "One"}, {id: 1, content: "two"}]
  }

  printAnswers = () => {
    return this.state.answers.map(function(answer){
      return <p key={answer.id} > {answer.content} fart </p>
    })
  }

  printQuestions = () => {
    const printAs = this.printAnswers
    return this.state.questions.map(function(question){
      return (
        <div key={question.id} >
          <div>{question.text}: {printAs()}</div>
        </div>
      )
    })
  }

  printDrones = () => {
    const printQs = this.printQuestions
    return this.state.drones.map(function(drone, index){
      if(index === 0){
        return (
          <div className="drone-contrainer" key={index}> 
            <h1>Queen Bee</h1> 
            <p>hey {drone.username}</p>
          </div>
        )
      } else {
        return (
          <div className="drone-contrainer" key={index}> 
            <h1>Player {index}: {drone.username}</h1> 
            <div>{printQs()}</div>
          </div>
        )
      }
    })
  }

  pollDrones = () => {
    const gameId = this.props.gameData.id
    fetch(`http://localhost:3000/poll-drones/${gameId}`)
    .then(res => res.json())
    .then(gameInfo => this.setState({
      game: gameInfo.game,
      drones: gameInfo.drones,
      questions: gameInfo.questions,
      // answers: gameInfo.answers
    }))
  }

  componentDidMount(){
    this.interval = setInterval(() => this.pollDrones(), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //delete all game stuff at end
  }

  render() {
    console.log(this.state, "game from queen state")
    return (
      <div className="Queen">
        Queen Room 
        {this.printDrones()}
        {/* {this.props.gameData} */}
        {/* { this.state.searching ? (

        ) : (
          this.printDrones()
        )} */}
      </div>
    );  
  }
}

export default Queen;

