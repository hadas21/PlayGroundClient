import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createLocation } from '../../api/location'
import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {

      location: '',
      description: ''

    }
  }

handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onCreateLocation = (event) => {
  event.preventDefault()

  const { history, user, msgAlert } = this.props
  const data = this.state

  createLocation(data, user)
    .then((res) => history.push('/locations' + res.data.location._id))
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
  const { location, description } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Add Location</h3>
        <Form onSubmit={this.onCreateLocation}>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              required
              type='text'
              name='location'
              value={location}
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
