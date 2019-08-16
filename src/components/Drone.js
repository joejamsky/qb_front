import React, { Component } from 'react';
import Question from './Question'

class Drone extends Component {

  constructor(props){
    super(props)
    this.state = {
      answers: [],
      seconds: 30
    }
  }

  handleAnswerSubmit = (answer) => {
    this.setState({
      answers: [...this.state.answers, answer]
    })
  }

  makeQuestion = () => {
    let handleAnswerSubmit = this.handleAnswerSubmit
    if(this.props.questionData.length !== 0){
      return this.props.questionData.map( function (question) {
        return <Question key={question.id} questionObj={question} handleAnswerSubmit={handleAnswerSubmit} />
      })
    }
  }

  saveAnswers = () => {
    fetch('http://localhost:3001/saveAnswers', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        answers: this.state.answers,
        user: this.props.userData,
        game: this.props.gameData
      })
    })
  }

  tick() {
    if(this.state.seconds === 0){
      this.saveAnswers()
      clearInterval(this.interval)
      this.props.history.push('/final')
    } else {
      this.setState(prevState => ({ seconds: prevState.seconds - 1 }) );
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props)
    return (
      <div className="Drone">
        {this.props ? (
          <div>
            <h1>You have this long to be interesting: {this.state.seconds} </h1>
            {this.makeQuestion()}
          </div>
        ) : (
          <h1> Loading </h1>
        )}
      </div>
    );  
  }
}

export default Drone;

