/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Mod extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

handleClose = () => this.setState({ show: false })
handleShow = () => this.setState({ show: true })
render () {
  return (
    <>
      <Button variant='primary' onClick={this.handleShow}>
                Launch demo modal
      </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> reading this text in a modal!</Modal.Body>
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

export default withRouter(Mod)
