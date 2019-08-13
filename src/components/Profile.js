import React, { Component } from 'react';
import '../css/profile.css'
import EditProfileAttribute from './EditProfileAttribute'

class Profile extends Component {

  state = {
    edit_age: false,
    edit_bio: false,
  }

  handleEditButton = (e) => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleDeleteClick = () => {
    if ( window.confirm('You are about to delete your profile. Continue?') ) {
      fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
        method: 'DELETE'
      })
    } 
    localStorage.clear()
    this.state.history.push('/login')
  }

  render() {
    return (
      <div className="profile-container"> 
        
        <div className="image-container">
        <img src={this.props.userData.profile_pic} alt="Logo" />
        </div>

        <h1>{this.props.userData.username}</h1>
        
        <h5>Age</h5>
        {this.state.edit_age ? (
          <EditProfileAttribute className="profile-attribute" userData={this.props.userData} attribute="age" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
        ) : (
          <h5 className="profile-attribute">{this.props.userData.age} <button name="edit_age" onClick={this.handleEditButton} >Edit</button> </h5>
        )}

        <h5>Bio</h5>
        {this.state.edit_bio ? (
          <EditProfileAttribute className="profile-attribute" userData={this.props.userData} attribute="bio" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
        ) : (
          <h5 className="profile-attribute">{this.props.userData.bio} <button name="edit_bio" onClick={this.handleEditButton} >Edit</button> </h5>
        )}
        
        <h5 onClick={this.handleDeleteClick} >Delete this mess </h5>
      </div>
    );  
  }
}

export default Profile;

