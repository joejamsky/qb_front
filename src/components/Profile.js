import React, { Component } from 'react';
import '../css/Profile.css'
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
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="ProfilePage"> 
        <div className="profile-container"> 
          <div className="image-container">
          <img src={this.props.userData.profile_pic} alt="Profile Pic" />
          </div>

          <h2>{this.props.userData.username}</h2>
  
          <div className="Profile-Data"> 
            <div className="Profile-Line">
              <h4>Age: </h4>
              {this.state.edit_age ? (
                <EditProfileAttribute className="profile-attribute" userData={this.props.userData} attribute="age" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
                ) : (
                <div className="Profile-Age">
                  <h4 className="profile-attribute">{this.props.userData.age}</h4>
                  <button className="Profile-btn" name="edit_age" onClick={this.handleEditButton} >Edit</button> 
                </div>
              )}
            </div>

            <div className="Profile-Line">
              <h4>Bio: </h4>
              {this.state.edit_bio ? (
                <EditProfileAttribute className="profile-attribute" userData={this.props.userData} attribute="bio" setUserState={this.props.setUserState} handleEditButton={this.handleEditButton} />
                ) : (
                <div className="Profile-Bio">
                  <h4 className="profile-attribute">{this.props.userData.bio}</h4>
                  <button className="Profile-btn" name="edit_bio" onClick={this.handleEditButton} >Edit</button> 
                </div>
              )}
            </div>
            
            <h6 onClick={this.handleDeleteClick} >Delete Profile</h6>
          </div>
        </div>
      </div>

    );  
  }
}

export default Profile;

