import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
      // console.log(data)
      if (data.token) {
        localStorage.token = data.token
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
        <form onSubmit={this.handleSignupSubmit} autoComplete="on" >
          <label>Username</label>
          <input onChange={this.handleFormChange} type="text" name="username" value={this.state.username} />
          <label>Password</label>
          <input onChange={this.handleFormChange} type="password" name="password" value={this.state.password} />
          <button> Submit </button>
        </form>
        <Link className="login" to="/login">Login to an Account</Link>
      </div>
    )
  }
}

export default SignupPage;
