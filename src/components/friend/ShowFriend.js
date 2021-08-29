import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showFriend, deleteFriend } from '../../api/friend'
import { showFriendFailure } from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'

class ShowFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friend: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    console.log('this is user', user)
    console.log('this is match', match)
    showFriend(match.params.id, user)
      .then((res) => this.setState({ friend: res.data.friend }))
      .catch((err) =>
        msgAlert({
          heading: 'Unable to Show Friend :(',
          message: showFriendFailure + err.message,
          variant: 'danger'
        })
      )
  }

handleDelete = (event) => {
  const { match, user, history } = this.props
  deleteFriend(match.params.id, user)
    // Redirect to the list of friends
    .then(() => history.push('/friends'))
    .catch((err) => console.log(err))
}

render () {
  if (this.state.friend === null) {
    return 'Loading...'
  }
  const { friend } = this.state
  console.log('this is friends ', friend)
  const { user } = this.props
  return (
    <>
      <h3>Show One Location</h3>
      <h5>{friend.username}</h5>
      <p>Where? Here - {friend.location}</p>
      {user._id === friend.owner && (
        <>
          <Button onClick={this.handleDelete}>Delete</Button>
        </>
      )}
    </>
  )
}
}

export default withRouter(ShowFriend)
