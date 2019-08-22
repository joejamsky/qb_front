import React, { Component } from 'react';

class HomePage extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    }
  }

  handleClick = (e) => {
    const value = e.target.id 
    this.props.history.push(`/${value}`)
  }

  render () {
    
    return (
      <div className="HomePage">
        <div onClick={this.handleClick} className="Menu-button" id="profile">
          Profile
        </div>
        <div onClick={this.handleClick} className="Menu-button" id="matches">
          Matches
        </div>
        <div onClick={this.handleClick} className="Menu-button" id="Game">
          Game
        </div>
      </div>
    )
  }
}

export default HomePage;
