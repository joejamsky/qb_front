import React, { Component } from 'react';

class Message extends Component {

  state = {
    message: ""
  }

  handleMessageChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleMessageSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/messages', {
      method: "POST"
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  render () {
    return (
      <div className="Message">
        <form onSubmit={this.handleMessageSubmit} autoComplete="on"  >
          <label>Message</label>
          <input onChange={this.handleMessageChange} type="text" name="message" value={this.state.message} />
          <button> Submit </button>
        </form>
      </div>
    )
  }
}

export default Message;
