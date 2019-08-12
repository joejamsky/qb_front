import React, { Component } from 'react';
import Question from './Question'

class Drone extends Component {

  constructor(props){
    super(props)
    this.state = {
      answers: [],
      seconds: 10
    }
  }

  handleAnswerSubmit = (answer) => {
    this.setState({
      answers: [...this.state.answers, answer]
    })
  }

  makeQuestion = () => {
    let handleAnswerSubmit = this.handleAnswerSubmit
    if(this.props.questions.length !== 0){
      return this.props.questions.map( function (question) {
        return <Question key={question.id} questionObj={question} handleAnswerSubmit={handleAnswerSubmit} />
      })
    }
  }

  tick() {
    if(this.state.seconds <= 0){
      console.log("times up")
    }
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state.seconds)
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

