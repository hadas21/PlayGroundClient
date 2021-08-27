import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { createLocation } from '../../api/location'
import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'

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

  const { user, msgAlert } = this.props

  const data = this.state

  createLocation(data, user)
    .then((res) => console.log(res.data.location.coordinates))
    .then()

    .then(() =>
      msgAlert({
        heading: 'Location Created!',
        message: createLocationSuccess,
        variant: 'success'
      })
    )
    .then(() => this.setState({ location: '', description: '' }))
    .catch((err) =>
      msgAlert({
        heading: 'Location creation failed :(',
        message: createLocationFailure + err.message,
        variant: 'danger'
      })
    )
}

render () {
  const { address, description } = this.props

  return (
    <div className='row'>
      <div className='col-sm-10 col-sm-8 mx-auto mt-5'>
        <Link to='/map' className='nav-link'>
            Add a Location
        </Link>
        <Form onSubmit={this.onCreateLocation}>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type='text'
              name='location'
              value={address}
              placeholder='Enter location'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name='description'
              value={description}
              type='text'
              placeholder='description'
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

export default withRouter(CreateLocation)
