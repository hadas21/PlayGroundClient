import React, { Component } from 'react'
import './Sidebar.scss'
import './../../index.scss'
import CreateLocation from '../location/CreateLocation'
import { createLocation } from '../../api/location.js'
import { createLocationSuccess, createLocationFailure } from '../AutoDismissAlert/messages'
// import mapboxgl from '!mapbox-gl'

// mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: '',
      description: '',
      coordinates: []
    }
  }

  // componentDidMount () {
  // const map = mapboxgl.Map({
  //     container: this.mapContainer.current})
  //   map.on('click', (e) => {
  //     this.setState({
  //       location: this.props.address
  //     })
  //   }

handleChange = (event) =>
  this.setState({
    description: event.target.value,
    coordinates: [this.props.lng, this.props.lat]
  })

onCreateLocation = (event) => {
  event.preventDefault()

  const { user, msgAlert } = this.props

  const data = this.state

  // const clearForm = (isPinDown) => {
  //   return !isPinDown
  // }

  createLocation(data, user)
    .then((res) => console.log(res.data.location.coordinates))
    .then()
  // .then((res) => history.push('/map/locations' + res.data.location._id))

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
  const { user, msgAlert } = this.props
  const { location } = this.state
  return (
    <>
      <div id='this.map.current'>
        <div id='left' className='sidebar flex-center left collapsed'>
          <div className='sidebar-content rounded-rect flex-center'>
            <CreateLocation
              msgAlert={msgAlert}
              user={user}
              address={location}
            />
          </div>
        </div>
      </div>
    </>
  )
}
}

export default Sidebar
