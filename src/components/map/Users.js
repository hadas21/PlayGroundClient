import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import FriendLocation from './FriendLocation'
import '../../index.scss'

class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/users`)
      .then((res) => {
        console.log('This is res.data ', res.data)
        const response = res.data.user.map((user) => [user.username, user._id, user.token])
        this.setState({ users: response })
        console.log('this is the setState: ', response)
      })
      .catch(console.error)
  }

  // handleClick = (token) => {
  //   console.log(token)
  //   indexFriendLocations(token)
  //     .then(() => console.log(this.props.user))
  //     .then((res) => console.log(res))
  //     .then((res) => this.setState({ locations: res.data.locations }))
  //     .catch((err) => console.log('this is the error ', err))
  // }

  render () {
    const { users } = this.state

    return (
      <>
        <h4>Users</h4>
        <div className='marquee'>
          <ul className='marquee--inner'>
            {users.map((user) => (
              <li className='user-name' key={user[1]}>
                <Link
                  to={`/map/locations/${user[1]}`}>
                  {user[0]}
                </Link>
                <FriendLocation token={user[2]} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Users
