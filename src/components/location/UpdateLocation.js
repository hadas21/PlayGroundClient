import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { updateLocation, showLocation } from '../../api/location'
// import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UpdateLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: {
        location: '',
        description: ''
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

  // handleChange = (event) =>
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })

  handleChange = (event) => {
    // because `this.state.movie` is an object with multiple keys, we have to do some fancy updating
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current movie state key/value pairs, then add the new one at the end
      // this will override the old key/value pair in the state but leave the others untouched
      return { location: { ...currState.location, ...userInput } }
    })
  }

handleSubmit = (event) => {
  event.preventDefault()

  const { user, match, history } = this.props
  const data = this.state.location

  updateLocation(data, match.params.id, user)
    .then(() => history.push('/locations/' + match.params.id))
    .then(() => this.setState({ location: { location: '', description: '' } }))
    .catch(err => console.log(err))
}

render () {
  const { location } = this.state

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Update Location</h3>
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
          <Button variant='primary' type='submit'>
                        Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}
}

export default withRouter(UpdateLocation)
