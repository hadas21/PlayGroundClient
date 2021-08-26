import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexFriends } from '../../api/friend'
import { showLocationFailure } from '../AutoDismissAlert/messages'

class IndexFriends extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locations: ''
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexFriends(user)
      .then(res => this.setState({ locations: res.data.locations }))
      .catch((err) =>
        msgAlert({
          heading: 'Unable to show Index of Friends :(',
          message: showLocationFailure + err.message,
          variant: 'danger'
        })
      )
  }

  // - render - display the movies in the state (optionally: loading message)
  render () {
    const { friends } = this.state
    if (friends === null) {
      return 'Loading...'
    }

    let FriendJsx = ''
    if (friends.length === 0) {
      FriendJsx = 'Why don\'t you have any friends? Go out and make some!'
    } else {
      FriendJsx = friends.map(friend => (
        <li key={friend._id}>
          <Link to={`/friends/${friend._id}`}>{friend.location}</Link>
        </li>
      ))
    }

    return (
      <>
        <h3>All Possible Friends:</h3>
        {FriendJsx}
      </>
    )
  }
}

export default IndexFriends
