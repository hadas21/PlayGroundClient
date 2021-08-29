import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// bootstrap
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// api calls
import { createLocation } from '../../api/location'
// messages
import { createLocationFailure } from '../AutoDismissAlert/messages'

class CreateLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: '',
      description: '',
      coordinates: []
    }
  }

handleChange = (event) =>

  this.setState({
    location: this.props.address,
    description: event.target.value,
    coordinates: [this.props.lng, this.props.lat]
  })

onCreateLocation = (event) => {
  event.preventDefault()

  const { user, msgAlert, setAddress } = this.props
  const data = this.state

  // send api req to create location with data from create location form
  createLocation(data, user)
    // empty form fields
    .then(() => this.setState({ description: '' }))
    .then(setAddress())
    .catch((err) => {
      msgAlert({
        heading: 'Location creation failed :(',
        message: createLocationFailure + err.message,
        variant: 'danger'
      })
      this.setState({ description: '' })
    })
}

render () {
  const { address } = this.props
  const { description } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-sm-8 mx-auto mt-5'>
        <Form onSubmit={this.onCreateLocation}>
          <Form.Group controlId='location'>
            <Form.Label>Drag and drop your pin to set a location.</Form.Label>
            <Form.Control
              size='sm'
              required
              type='text'
              name='location'
              value={address}
              placeholder='Location'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Tell us </Form.Label>
            <Form.Control
              size='sm'
              required
              name='description'
              value={description}
              type='text'
              placeholder='description'
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

export default withRouter(CreateLocation)
