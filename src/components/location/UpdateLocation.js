import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateLocation, showLocation } from '../../api/location'
import { updateLocationFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UpdateLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        location: '',
        description: '',
        show: false
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user } = this.props

    showLocation(match.params.id, user)
      .then(res => this.setState({ location: res.data.location }))
      .catch(err => console.log(err))
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
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

  updateLocation(data, id, user)
    .then(() => history.push('/map/locations/' + id))
    .then(() => this.setState({ location: { location: '', description: '' } }))
    .catch((err) => {
      msgAlert({
        heading: 'location update failed :(',
        message: updateLocationFailure + err.message,
        variant: 'danger'
      })
    })
}

render () {
  const { location } = this.state

  return (
    <>
      <Button variant='primary' onClick={this.handleShow}>
        Update Location
      </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Location</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type='text'
                name='location'
                value={location.location}
                placeholder='Enter location'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name='description'
                value={location.description}
                type='text'
                placeholder='description'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit' onClick={this.handleClose}> Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
}

export default withRouter(UpdateLocation)
