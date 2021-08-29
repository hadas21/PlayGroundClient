import axios from 'axios'
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

// import the api's url
import apiUrl from '../apiConfig'

// This will be our Books Index component (show all books)
class Users extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero books, until our API request has finished
      users: []
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the books
    axios(`${apiUrl}/users`)
      .then((res) => {
        console.log('this is res: ', res)
        for (const { username } of res.data.user) {
          this.setState({ users: [username] })
        }
      })
      .then(() => console.log(this.state))
      .catch(console.error)
  }

  render () {
    const { users } = this.state

    const userList = users.map(user => (
      <li key={user._id}>
        {user.username}
      </li>
    ))

    return (
      <>
        <h4>Users</h4>
        <ul>{userList}</ul>
      </>
    )
  }
}

export default Users
