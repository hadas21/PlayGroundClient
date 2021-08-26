import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showFriend, deleteFriend } from '../../api/friend'
import { showLocationFailure } from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'

class ShowFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showFriend(match.params.id, user)
      .then((res) => this.setState({ location: res.data.location }))
      .catch((err) =>
        msgAlert({
          heading: 'Unable to Show Friend :(',
          message: showLocationFailure + err.message,
          variant: 'danger'
        })
      )
  }

  handleDelete = (event) => {
    const { match, user, history } = this.props
    deleteFriend(match.params.id, user)
    // Redirect to the list of locations
      .then(() => history.push('/friends'))
      .catch((err) => console.log(err))
  }

  render () {
    if (this.state.location === null) {
      return 'Loading...'
    }

    const { friend, owner } = this.state.location
    const { user, history, match } = this.props

    return (
      <>
        <h3>Show One Friend</h3>
        <h5>{friend}</h5>
        {user._id === owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button
              onClick={() => history.push(`/friends/${match.params.id}/edit`)}>
              Update
            </Button>
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowFriend)
