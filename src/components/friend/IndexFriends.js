import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexFriends } from '../../api/friend'
import { showFriendFailure } from '../AutoDismissAlert/messages'

class IndexFriends extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friends: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexFriends(user)
      .then((res) => {
        this.setState({ friends: res.data.friends })
      })
      .catch((err) =>
        msgAlert({
          heading: 'Index failed :(',
          message: showFriendFailure + err.message,
          variant: 'danger'
        })
      )
  }

  render () {
    const { friends } = this.state
    console.log('this is friends in index ', friends)
    if (friends === null) {
      return 'Loading...'
    }

    let friendJsx
    if (friends.length === 0) {
      friendJsx = 'Why don\'t you have any friends? Go out and make some!'
    } else {
      friendJsx = friends.map((friends) => (
        <li key={friends._id}>
          <Link to={`/friends/${friends._id}`}>{friends.username}</Link>
        </li>
      ))
    }

    return (
      <>
        <h3>All Friends:</h3>
        <p>{friendJsx}</p>
      </>
    )
  }
}

export default IndexFriends
