import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateLocation, showLocation, deleteLocation, indexLocations } from '../../api/location'
// import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class UpdatePopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        id: '',
        description: '',
        show: false
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user } = this.props

    showLocation(match.params.id, user)
      .then((res) => this.setState({ location: res.data.location }))
      .catch((err) => console.log(err))
  }

handleClose = () => this.setState({ show: false })
handleShow = () => this.setState({ show: true })
handleChange = (event) => {
  const userInput = { [event.target.name]: event.target.value }
  this.setState((currState) => {
    return { location: { ...currState.location, ...userInput } }
  })
}

handleUpdateSubmit = (event) => {
  event.preventDefault()
  const { user, msgAlert } = this.props
  const data = this.state.location
  // const id = match.params.id

  // const resetMap = (props) => {
  //   const { user } = this.props

  //   indexLocations(user)
  //     .then(() => console.log('this worked'))
  //     .then((res) => console.log('this is res in update index: ', res))
  //     .catch((err) => console.log(err))
  // }

  updateLocation(data, user)
    .then(() => console.log('this is user in update popup: ', user))
    .then(() => this.setState({ location: { id: '', description: '' } }))
    // .then(() =>
    //   indexLocations(user)
    //     .then((res) => {
    //       console.log(res)
    //       // const placeholder = document.createElement('div')
    //       // ReactDOM.render(PopupButton, placeholder)
    //       for (const { coordinates, location, description, _id } of res.data
    //         .locations) {
    //       // this.updateData = { location, description, _id }
    //       // make a marker for each location and add to the map
    //         new mapboxgl.Marker({
    //           draggable: false,
    //           color: '#ffff'
    //         })
    //           .setLngLat(coordinates)
    //           .setPopup(
    //             new mapboxgl.Popup({ offset: 25 }).setHTML(
    //               `
    //           <div>
    //           <h4>${location}</h4>
    //           <h6>${description}</h6>
    //           <p>ID: ${_id}</p>
    //           <button onClick={removePopUp}>delete</button>
    //           </div>
    //           `
    //             )
    //           )
    //           .addTo(map)
    //       }
    //     })
    // )
    .then(() => {
      msgAlert({
        heading: 'updated!',
        variant: 'success'
      })
    })
  // .then(() => <Redirect to='/map'/>)
    .catch((err) => console.log(err))

  indexLocations(user)
}

handleDeleteSubmit = (event) => {
  event.preventDefault()

  const { user, msgAlert } = this.props
  const data = this.state.location
  // const id = match.params.id

  deleteLocation(data.id, user)
    .then(() => this.setState({ location: { id: '' } }))
    .then(() => {
      msgAlert({
        heading: 'Deleted!',
        variant: 'success'
      })
    })
    .catch((err) => {
      msgAlert({
        heading: 'Unable to delete location',
        message: err.message,
        variant: 'danger'
      })
    })
}

render () {
  // const { location } = this.state

  return (
    <>
      <Button variant='primary' onClick={this.handleShow}>
        Update Location
      </Button>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Location</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleUpdateSubmit}>
            {/* <Form.Select aria-label='Default select example'>
            <option>Location to Edit</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </Form.Select> */}
            <Form.Group controlId='id'>
              <Form.Label>ID</Form.Label>
              <Form.Control
                required
                name='id'
                type='text'
                placeholder='Copy the ID the location you would like to update'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name='description'
                type='text'
                placeholder='Type in your new description'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              onClick={this.handleClose}>
              Update
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title>or Delete Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleDeleteSubmit}>
            <Form.Group controlId='id'>
              <Form.Label>ID</Form.Label>
              <Form.Control
                required
                name='id'
                type='text'
                placeholder='Copy the ID the location you would like to update'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant='primary'
              type='submit'
              onClick={this.handleClose}>
              Delete
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
}

export default withRouter(UpdatePopup)
