import axios from 'axios'
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

// import the api's url
import apiUrl from '../../apiConfig'

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
<<<<<<< HEAD
        console.log(res.data.user)
        const response = res.data.user.map((user) => user.username)
        this.setState({ users: response })
=======
        console.log(res)
        this.setState({ users: res.data.users })
>>>>>>> fc0cb16 (g)
      })
      .catch(console.error)
  }

  render () {
<<<<<<< HEAD
    // const users = this.state
=======
    const users = this.state.user
    // .map(user => (
    //   <li key={user._id}>
    //     <Link to={`/users/${user._id}`}>{user.username}</Link>
    //   </li>
    // ))
>>>>>>> fc0cb16 (g)

    return (
      <>
        <h4>Users</h4>
<<<<<<< HEAD
        {/* <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user}
            </li>
          ))}
        </ul> */}
=======
        <ul>{users}</ul>
>>>>>>> fc0cb16 (g)
      </>
    )
  }
}

export default Users
