import React, { Component } from 'react';

class Queen extends Component {

  state = {
    game: {},
    drones: [],
    questions: [],
    answers: []
  }

  printAnswers = () => {
    return this.state.answers.map(function(answer){
      return <p key={answer.id} > {answer.content} fart </p>
    })
  }

  selectDrone = (e) => {
    const id = parseInt(e.target.value)
    fetch(`http://localhost:3000/createChoice/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        user: this.props.userData,
        game: this.props.gameData
      })
    })
    .then( this.props.history.push(`/final`) )

    clearInterval(this.interval);
  }

  printQuestionAndAnswers = () => {
    const print_answers = this.state.answers
    if(print_answers !== undefined){
      const answers = this.state.answers 
      return this.state.questions.map(function(question, index){
        return (
          <div key={question.id} >
            <div>{question.text}: {answers[index].content} fart</div>
          </div>
        )
      })
    }
    return this.state.questions.map(function(question, index){
      return (
        <div key={question.id} >
          <div>{question.text}: </div>
        </div>
      )
    })
  }

  printDrones = () => {
    const printQnAs = this.printQuestionAndAnswers
    const droneClicker = this.selectDrone
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
            <h1>Player {index}: {drone.username} <button onClick={droneClicker} value={drone.id}>Select</button></h1> 
            <div>{printQnAs()}</div>
          </div>
        )
      }
    })
  }

  pollDrones = () => {
    const gameId = this.props.gameData.id
    fetch(`http://localhost:3000/poll-drones/${gameId}`)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(gameInfo => this.setState({
      game: gameInfo.game,
      drones: gameInfo.drones,
      questions: gameInfo.questions,
      answers: gameInfo.answers
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

