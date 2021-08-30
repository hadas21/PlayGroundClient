import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createFriend } from '../../api/friend'
import {
  createFriendSuccess,
  createFriendFailure
} from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      location: ''
    }
  }

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onCreateFriend = (event) => {
  event.preventDefault()

  const { history, user, msgAlert } = this.props
  const data = this.state

  createFriend(data, user)
    .then((res) => history.push('/friends/' + res.data.friend._id))
    .then(() =>
      msgAlert({
        heading: 'Friend Added!',
        message: createFriendSuccess,
        variant: 'success'
      })
    )
    .then(() => this.setState({ location: '', description: '' }))
    .catch((err) =>
      msgAlert({
        heading: 'Failed adding Friend :(',
        message: createFriendFailure + err.message,
        variant: 'danger'
      })
    )
}

render () {
  const { username } = this.state
  // location

  return (
    <div className='row'>
      <div className='col-sm-10 col-sm-8 mx-auto mt-5'>
        <Form onSubmit={this.onCreateFriend}>
          <Form.Group controlId='friend'>
            <Form.Label>Add Friend</Form.Label>
            <Form.Control
              type='username'
              name='username'
              value={username}
              placeholder='Add friend name...'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Add
          </Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(CreateFriend)
