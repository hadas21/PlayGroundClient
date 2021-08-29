import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { createLocation } from '../../api/location'
import {
  createLocationSuccess,
  createLocationFailure
} from '../AutoDismissAlert/messages'

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

  const { user, msgAlert, history, setAddress } = this.props

  const data = this.state

  createLocation(data, user)
    .then((res) => console.log(res.data.location.coordinates))
    .then(() => history.push('/map'))
    .then(() =>
      msgAlert({
        heading: 'Location Created!',
        message: createLocationSuccess,
        variant: 'success'
      })
    )
    .then(() => this.setState({ location: '', description: '' }))
    .then(setAddress())
    .catch((err) =>
      msgAlert({
        heading: 'Location creation failed :(',
        message: createLocationFailure + err.message,
        variant: 'danger'
      })
    )
}

render () {
  const { address } = this.props
  const { description } = this.props

  return (
    <div className='row'>
      <div className='col-sm-10 col-sm-8 mx-auto mt-5'>
        {/* <h4>Drag and drop your pin to set a location.</h4> */}
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
