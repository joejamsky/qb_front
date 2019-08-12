import React, { Component } from 'react';
import '../css/profile.css'
import { Link } from 'react-router-dom'
import EditProfileAttribute from './EditProfileAttribute'

class Profile extends Component {

  state = {
    user: {},
    edit_age: false,
    edit_bio: false,
  }

  handleEditButton = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/profile',{
      headers:  {
        Authorization: localStorage.token
      }
    })
    .then(res => res.json())
    .then(userObj => {
      this.setState({user: userObj})
    })
  }

  handleDeleteClick = () => {
    if ( window.confirm('You are about to delete your profile. Continue?') ) {
      fetch(`http://localhost:3000/users/${this.state.user.id}`, {
        method: 'DELETE'
      })
    } 
    localStorage.clear()
    this.state.history.push('/login')
  }

  render() {
    return (
      <div className="profile-container"> 
        <Link className="home-link" to="/home">Home</Link>
        
        <div className="image-container">
        <img src={this.state.user.profile_pic} alt="Logo" />
        </div>

        <h1>{this.state.user.username}</h1>
        
        <h5>Age</h5>
        {this.state.edit_age ? (
          <EditProfileAttribute className="profile-attribute" userData={this.state.user} attribute="age" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
        ) : (
          <h5 className="profile-attribute">{this.state.user.age} <button name="edit_age" onClick={this.handleEditButton} >Edit</button> </h5>
        )}

        <h5>Bio</h5>
        {this.state.edit_bio ? (
          <EditProfileAttribute className="profile-attribute" userData={this.state.user} attribute="bio" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
        ) : (
          <h5 className="profile-attribute">{this.state.user.bio} <button name="edit_bio" onClick={this.handleEditButton} >Edit</button> </h5>
        )}
        
        <h5 onClick={this.handleDeleteClick} >Delete this mess </h5>
      </div>
    );  
  }
}

export default Profile;

