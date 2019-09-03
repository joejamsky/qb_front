import React, { Component } from 'react';

class EditProfileAttribute extends Component {

  state = {
    attribute: ""
  }

  handleEditSubmit = (e) => {
    e.preventDefault()
    this.props.userData[this.props.attribute] = this.state.attribute
    this.props.setUserState(this.props.userData)

    e.target.name = "edit_" + e.target.name
    this.props.handleEditButton(e)

    fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(this.props.userData)
    })
  }

  handleAttributeChange = (e) => {
    this.setState({
      attribute: e.target.value
    })
  }

  cancelEdit = (e) => {
    e.preventDefault()
    e.target.name = "edit_" + e.target.name
    this.props.handleEditButton(e)
  }

  render() {
    return (
      <form onSubmit={this.handleEditSubmit} name={this.props.attribute} > 
        <input value={this.state.attribute} onChange={this.handleAttributeChange} />
        <input type="submit" value="Confirm" />
        <input type="button" value="Cancel" name={this.props.attribute} onClick={this.cancelEdit} />
      </form>
    )
  }
}

export default EditProfileAttribute

    // user:
    //   age: 20
    //   bio: "King of the world"
    //   created_at: "2019-08-10T22:46:13.810Z"
    //   email: "joe@joe.com"
    //   id: 1
    //   password_digest: "$2a$12$PMAbjDH5cfFp.eN5spRMuuQgfmcZyobeCoVY0jmCvHG4T8Kp1rRu6"
    //   profile_pic: "https://www.biography.com/.image/t_share/MTIwNjA4NjMzODg2NTc0MDky/abraham-lincoln-9382540-2-402.jpg"
    //   queen: null
    //   updated_at: "2019-08-10T22:46:13.810Z"
    //   username: "Joe"
