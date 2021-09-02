import React, { Component } from 'react'

// mapbox

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// style
import './../../index.scss'
// api calls
import { indexLocations } from '../../api/location'
import { getAddress } from '../../api/map'

// components

import Sidebar from './Sidebar'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lng: '',
      lat: '',
      zoom: '',
      address: '',
      color: '',
      center: {}
    }
    this.mapContainer = React.createRef()
  }

setAddress = () => {
  this.setState({ address: '' })
}

// update = false

handleEdit = (event, update) => {
  console.log('Event and Edit: ', event, update)
  // update = true
  // this.setState({
  //   description: event.target.value
  // })
}

componentDidMount () {
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds'
  })

  const { color } = this.state
  // get saved locations to display markers on map
  indexLocations(this.props.user)
  // set markers on map
    .then((res) => {
      for (const { coordinates, location, description } of res.data
        .locations) {
        // make a marker for each location and add to the map
        new mapboxgl.Marker({
          draggable: false,
          color: '#ffff'
        })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `
                <h3>${location}</h3>
                <p>${description}</p>        
              `
            )
          )
          .addTo(map)
      }
    })
    .catch((error) =>
      this.props.msgAlert({
        heading: 'Sorry, ' + error.message,
        message:
          'The map did not load with your locations. please try refreshing the page',
        variant: 'danger'
      })
    )

  // map.dragRotate.enable()

  // drop new draggable marker to create new location
  const marker = new mapboxgl.Marker({ color: color, draggable: true })
    .setLngLat([map.getCenter().lng, map.getCenter().lat]) // map.getCenter().lat.toFixed(4)
    .addTo(map)
  // keep only one draggable marker on map
  map.on('moveend', () => {
    marker.remove()

    marker
      .setLngLat([map.getCenter().lng, map.getCenter().lat]) // map.getCenter().lat.toFixed(4)
      .addTo(map)
    // store data of marked location
    const onDragEnd = (e) => {
      // set state to marker coords
      const lngLat = marker.getLngLat()
      this.setState({
        lng: lngLat.lng,
        lat: lngLat.lat,
        zoom: map.getZoom().toFixed(2)
      })

      // transfer coords to string address
      getAddress(lngLat.lng, lngLat.lat)
        .then((res) => {
          console.log(res.data)
          this.setState({ address: res.data.features[1].place_name })
        })
        .catch((error) =>
          this.props.msgAlert({
            heading: 'Oops... ' + error.message,
            message:
              'There is no registered address for the selected area, please zoom in and try again',
            variant: 'danger'
          })
        )

      // index locations again to display new location NEED TO FIND CLEANER WAY TO DO THIS!!!
      indexLocations(this.props.user)
        .then((res) => {
          console.log(res)
          for (const { coordinates, location, description } of res.data
            .locations) {
            new mapboxgl.Marker({ draggable: false, color: '#ffff' })
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `
                  <form>
                  <label>${location}</label>
                  <input 
                  {this.edit ? value='' && placeholder='${description}' :  value='${description}' && placeholder='' }
                  >
                  </input>
                  <button type='button' 'onClick='${() => this.handleEdit()}''>edit</button>
                  </form> 
                  `
                )
              )
              .setLngLat(coordinates)
              .addTo(map)
          }
        })
        .catch((error) =>
          this.props.msgAlert({
            heading: 'Sorry, : ' + error.message,
            message:
              'The map did not load with your locations. please try refreshing the page',
            variant: 'danger'
          })
        )
    }

    marker.on('dragend', onDragEnd)
  })

  // add search box to map
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  })
  map.addControl(geocoder)
  // show boston on the map
  map.on('load', () => {
    geocoder.query('Boston')
  })
}

render () {
  const { lng, lat, zoom, address } = this.state
  const { user, msgAlert } = this.props
  return (
    <div>
      <Sidebar
        lng={lng}
        lat={lat}
        msgAlert={msgAlert}
        user={user}
        address={address}
        setAddress={this.setAddress}
      />
      <div ref={this.mapContainer} className='map-container'>
        <div className='lat-long'>
          {' '}
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  )
}
}

export default Map
