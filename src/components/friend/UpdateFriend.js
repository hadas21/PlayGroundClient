import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateFriend, showFriend } from '../../api/friend'
import { updateFriendFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friend: {
        username: '',
        location: ''
      }
    }
  }

  componentDidMount () {
  // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user } = this.props

    showFriend(match.params.id, user)
      .then((res) => this.setState({ friend: res.data.friend }))
      .catch((err) => console.log(err))
  }

handleChange = (event) => {
  const userInput = { [event.target.name]: event.target.value }
  this.setState((currState) => {
    return { friend: { ...currState.friend, ...userInput } }
  })
}

handleSubmit = (event) => {
  event.preventDefault()

  const { user, match, history, msgAlert } = this.props
  const data = this.state.friend
  const id = match.params.id

  updateFriend(data, id, user)
    .then(() => history.push('/friends/' + id))
    .then(() => this.setState({ friend: { username: '', location: '' } }))
    .catch((err) => {
      msgAlert({
        heading: 'friend update failed :(',
        message: updateFriendFailure + err.message,
        variant: 'danger'
      })
    })
}

render () {
  const { friend } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Update Friend</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='username'>
            <Form.Label>Friend</Form.Label>
            <Form.Control
              required
              type='text'
              name='username'
              value={friend.username}
              placeholder='Edit Friend'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              name='location'
              value={friend.location}
              type='text'
              placeholder='location'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(UpdateFriend)
