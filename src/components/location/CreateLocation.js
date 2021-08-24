import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createLocation } from '../../api/location'
// import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

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

  const { user } = this.props
  const data = this.state

  createLocation(data, user)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  // .then(() =>
// msgAlert({
// heading: 'Sign Up Success',
// message: signUpSuccess,
// variant: 'success',
// })
// )
// .then(() => history.push('/'))
// .catch((error) => {
// this.setState({ email: '', password: '', passwordConfirmation: '' })
// msgAlert({
// heading: 'Sign Up Failed with error: ' + error.message,
// message: signUpFailure,
// variant: 'danger',
// })
  // })
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
