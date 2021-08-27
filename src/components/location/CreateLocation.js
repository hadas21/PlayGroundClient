import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import { createLocation } from '../../api/location'
// import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'

class CreateLocation extends Component {
  render () {
    const { address, description } = this.props

    return (
      <div className='row'>
        <div className='col-sm-10 col-sm-8 mx-auto mt-5'>
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

            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
          <Button>
            <Link to='/map' className='nav-link'>Add a Location</Link>
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateLocation)
