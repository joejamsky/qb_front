import React, { Component } from 'react';

class Final extends Component {

  state = {
    searching: true
  }

  checkChoice = () => {
    const id = this.props.gameData.id
    debugger
    fetch(`http://localhost:3000/pollChoice/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .then(this.setState({
      searching: false
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkChoice(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    debugger
    return (
      <div className="Final">
        { this.state.searching ? (
          <h1>WHO WINNAH?</h1>
        ) : (
          <h1>IT ME</h1>
        )}
      </div>
    );  
  }
}

export default Final;