import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LoginPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
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
      <div className="LoginPage">
        <h1>Login</h1>
        <form onSubmit={this.handleLoginSubmit} autoComplete="on"  >
          <label>Username</label>
          <input onChange={this.handleFormChange} type="text" name="username" value={this.state.username} />
          <label>Password</label>
          <input onChange={this.handleFormChange} type="password" name="password" value={this.state.password} />
          <button> Submit </button>
        </form>
        <Link className="signup" to="/signup">Create an Account</Link>
      </div>
    )
  }
}

export default LoginPage;
