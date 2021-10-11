import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { findLocation } from '../../api/map'
import { changePasswordFailure } from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'

import Button from 'react-bootstrap/Button'

class SearchLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: ''
    }
  }

handleChange = (event) =>
  this.setState({
    location: event.target.value
  })

onFindLocation = (event) => {
  event.preventDefault()

  const { location } = this.state
  const { msgAlert } = this.props

  findLocation(location)
    .then((res) => console.log(res))
    // .then(() => history.push('/'))
    .catch((error) => { // change wording of error message
      this.setState({ oldPassword: '', newPassword: '' })
      msgAlert({
        heading: 'Change Password Failed with error: ' + error.message,
        message: changePasswordFailure,
        variant: 'danger'
      })
    })
}

render () {
  return (
    <>
      <h3>Find location on map</h3>

      <Form onSubmit={this.onFindLocation}>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='search location'
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
                Submit
        </Button>
      </Form>
    </>
  )
}
}

export default withRouter(SearchLocation)
