import React, { Component } from 'react';
import '../css/LoginSignup.css'

class SignupPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSignupSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.token = data.token
        this.props.setUserState(data.user)
        this.props.history.push('/home')
      }
    })
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className="SignupPage">
        <h1>Sign Up</h1>
        <form className="splash-form" onSubmit={this.handleSignupSubmit} autoComplete="on" >
          <label className="splash-label" >Username</label>
          <input className="splash-input" onChange={this.handleFormChange} type="text" name="username" value={this.state.username} />
          <label className="splash-label" >Password</label>
          <input className="splash-input" onChange={this.handleFormChange} type="password" name="password" value={this.state.password} />
          <button className="splash-btn">Confirm</button>
        </form>
      </div>
    )
  }
}

export default SignupPage;
