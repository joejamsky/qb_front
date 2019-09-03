import React, { Component } from 'react';

class Question extends Component {

  state = {
    answer: ""
  }

  handleFormChange = (e) => {
    this.setState({
      answer: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    e.target.children[3].remove()
    e.target.children[2].remove()
    this.props.handleAnswerSubmit(this.state)
  }

  render() {
    return (
      <div className="Question">
        {this.props.questionObj ? (
          <form onSubmit={this.handleFormSubmit} autoComplete="on"  >
            <p>Question: {this.props.questionObj.text}</p>
            <label>Response: </label>
            <input onChange={this.handleFormChange} type="text" name="answer" value={this.state.answer} />
            <button>Submit</button>
          </form>
        ) : ( 
          <h1>loading</h1> 
        )}
      </div>
    );  
  }
}

export default Question;

