import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
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

  render () {
    const { users } = this.state

    return (
      <>
        <div className='marquee'>
          <ul className='marquee--inner'>
            {users.map((user) => (
              <li className='user-name' key={user[1]}>
                <>
                  {user[0]}
                  {user[0]}
                  {user[0]}
                  {user[0]}
                  {user[0]}
                  {user[0]}
                </>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Users
