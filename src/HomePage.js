import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import Message from './Message'


class HomePage extends Component {

  handleLogout = () => {
    localStorage.clear()
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    }
  }

  render () {
    return (
      <div className="HomePage">
          <h1>Welcome </h1>
          <Link onClick={this.handleLogout} className="logout" to="/login">Logout</Link>
      </div>
    )
  }
}

export default HomePage;
