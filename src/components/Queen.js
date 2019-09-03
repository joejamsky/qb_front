import React, { Component } from 'react';
import smallLoading from '../assets/smallLoading.gif'

class Queen extends Component {

  state = {
    game: {},
    drones: [],
    questions: [],
    answers: [],
    select_ready: false
  }

  printAnswers = () => {
    return this.state.answers.map(function(answer){
      return <p key={answer.id} > {answer.content} </p>
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

  printQuestionAndAnswers = (index) => {
    const print_answers = this.state.answers
    if(print_answers !== undefined && print_answers.length > 5){
      const answers = this.state.answers 
      const multiplier = index * 2
      if(index === 1){
        return this.state.questions.map(function(question, q_index){
          return (
            <div key={question.id} >
              <div>{question.text}: {answers[q_index].content}</div>
            </div>
          )
        })
      } else {
        return this.state.questions.map(function(question, q_index){
          return (
            <div key={question.id} >
              <div>{question.text}: {answers[q_index + multiplier].content}</div>
            </div>
          )
        })
      }

    } else {
      return this.state.questions.map(function(question, index){
        return (
          <div key={question.id} >
            <div>{question.text}: </div>
          </div>
        )
      })
    }
  }

  printDrones = () => {
    const printQnAs = this.printQuestionAndAnswers
    const droneClicker = this.selectDrone
    const ready = this.state.select_ready
    return this.state.drones.map(function(drone, index){
      if(index === 0){
        return (
          <div className="drone-container" key={index}> 
            <h1>Queen Bee: {drone.username}</h1> 
            <img className="Select-Queen" src={drone.profile_pic} alt="Profile Pic" />
          </div>
        )
      } else {
        return (
          <div className="drone-container" key={index}> 
            {ready === true ? ( 
              <div className="drone-container">
                <h1>Player {index}</h1>   
                <button className="select-btn" onClick={droneClicker} value={drone.id}>Select</button>
              </div>
            ) : ( 
              <div className="drone-container">
                <h1>Player {index} </h1>   
                <img className="img-small-loading" src={smallLoading} alt="boohoo"/>
              </div>
            )}
            <div>{printQnAs(index)}</div>
          </div>
        )
      }
    })
  }

  handlePoll = (gameInfo) => {
    if(gameInfo.answers){
      this.setState({
        game: gameInfo.game,
        drones: gameInfo.drones,
        questions: gameInfo.questions,
        answers: gameInfo.answers,
        select_ready: true
      })
    } else {
      this.setState({
        game: gameInfo.game,
        drones: gameInfo.drones,
        questions: gameInfo.questions,
        answers: gameInfo.answers
      })
    }
  }

  pollDrones = () => {
    const gameId = this.props.gameData.id
    fetch(`http://localhost:3000/poll-drones/${gameId}`)
    .then(res => res.json())
    .then(gameInfo => this.handlePoll(gameInfo))
  }

  componentDidMount(){
    this.interval = setInterval(() => this.pollDrones(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //delete all game stuff at end
  }

  render() {
    return (
      <div className="QueenPage">
        <div className="Queen">
          {this.printDrones()}
        </div>
      </div>
    );  
  }
}

export default Queen;

