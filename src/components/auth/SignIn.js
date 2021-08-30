import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import { signInFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      show: false
    }
  }

handleClose = () => this.setState({ show: false })
handleShow = () => this.setState({ show: true })
handleChange = (event) =>
  this.setState({
    [event.target.name]: event.target.value
  })

onSignIn = (event) => {
  event.preventDefault()

  const { msgAlert, history, setUser } = this.props

  signIn(this.state)
    .then((res) => setUser(res.data.user))
    .then(() => history.push('/map'))
    .catch((error) => {
      this.setState({ username: '', password: '' })
      msgAlert({
        heading: 'Sign In Failed with error: ' + error.message,
        message: signInFailure,
        variant: 'danger'
      })
    })
}

render () {
  const { username, password } = this.state

  return (
    <>
      <Button variant='primary' onClick={this.handleShow}>
        Sign In
      </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {' '}
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId='username'>
              <Form.Label>username address</Form.Label>
              <Form.Control
                required
                type='username'
                name='username'
                value={username}
                placeholder='Enter username'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name='password'
                value={password}
                type='password'
                placeholder='Password'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
}

export default withRouter(SignIn)
