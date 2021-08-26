import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createFriend } from '../../api/friend'
import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {

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
    .then((res) => history.push('/friends' + res.data.location._id))
    .then(() =>
      msgAlert({
        heading: 'Friend Added!',
        message: createLocationSuccess,
        variant: 'success'
      })
    )
    .then(() => this.setState({ location: '', description: '' }))
    .catch((err) =>
      msgAlert({
        heading: 'Failed adding Friend :(',
        message: createLocationFailure + err.message,
        variant: 'danger'
      })
    )
}

render () {
  const { friend } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Add Friend</h3>
        <Form onSubmit={this.onCreateFriend}>
          <Form.Group controlId='friend'>
            <Form.Label>
                Add Friend
            </Form.Label>
            <Form.Control
              required
              type='text'
              name='friend'
              value={friend}
              placeholder='Add Friend'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
                        Add
          </Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(CreateFriend)
