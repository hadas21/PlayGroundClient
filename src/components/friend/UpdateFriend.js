import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateFriend, showFriend } from '../../api/friend'
import { updateLocationFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateFriend extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        location: ''
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user } = this.props

    showFriend(match.params.id, user)
      .then(res => this.setState({ location: res.data.location }))
      .catch(err => console.log(err))
  }

  handleChange = (event) => {
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      return { location: { ...currState.location, ...userInput } }
    })
  }

handleSubmit = (event) => {
  event.preventDefault()

  const { user, match, history, msgAlert } = this.props
  const data = this.state.location
  const id = match.params.id

  updateFriend(data, id, user)
    .then(() => history.push('/friends/' + id))
    .then(() => this.setState({ location: { location: '', description: '' } }))
    .catch((err) => {
      msgAlert({
        heading: 'friend update failed :(',
        message: updateLocationFailure + err.message,
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
          <Form.Group controlId='friend'>
            <Form.Label>Friend</Form.Label>
            <Form.Control
              required
              type='text'
              name='friend'
              value={friend.location}
              placeholder='Edit Friend'
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
