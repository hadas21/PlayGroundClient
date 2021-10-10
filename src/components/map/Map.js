import React, { Component } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './../../index.scss'
import { indexLocations } from '../../api/location'
import { getAddress } from '../../api/map'
import CreateLocation from '../location/CreateLocation'
import PlaygroundWelcome from './PlaygroundWelcome'

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
      center: {},
      editLocation: ''
    }
    this.mapContainer = React.createRef()
  }

setAddress = () => {
  this.setState({ address: '' })
}

updateData = {}

componentDidMount () {
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/ckuj0d93d323s17rwaujvd8go',
    center: [-10, 19],
    zoom: 1
  })

  const { color } = this.state
  // get saved locations to display markers on map
  indexLocations(this.props.user)
    .then((res) => {
      console.log(res)
      // const placeholder = document.createElement('div')
      // ReactDOM.render(PopupButton, placeholder)
      for (const { coordinates, location, description, _id } of res.data
        .locations) {
        // this.updateData = { location, description, _id }
        // make a marker for each location and add to the map
        new mapboxgl.Marker({
          draggable: false,
          color: '#ffff'
        })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `
              <div>
              <h4>${location}</h4>
              <h6>${description}</h6>
              <p>ID: ${_id}</p>
              </div>
              `
            ))
          .addTo(map)
      }
    })
    .then(() => console.log('back in componentDidMount'))
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
  })

  // store data of marked location
  const onDragEnd = (e) => {
    // set state to marker coords
    const lngLat = marker.getLngLat()
    this.setState({
      lng: lngLat.lng,
      lat: lngLat.lat,
      zoom: map.getZoom().toFixed(2)
    })

    getAddress(lngLat.lng, lngLat.lat)
      .then((res) => {
        console.log(res.data)
        this.setState({ address: res.data.features[1].place_name })
      })
      .catch((res) => this.setState({ address: 'Ooops, that is the ocean! Pick somewhere on land.' }))

    indexLocations(this.props.user)
      .then((res) => {
        console.log(res)
        for (const { coordinates, location, description, _id } of res.data
          .locations) {
          new mapboxgl.Marker({ draggable: false, color: '#ffff' })
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                    <div>
                    <h5>${location}</h5>
                    <h6>${description}</h6>
                    <p>ID: ${_id}</p>
                    </div>
                  `
              )
            )
            .setLngLat(coordinates)
            .addTo(map)
        }
      })
      .catch((error) => console.log('second index location failed \n', error))
  }

  marker.on('dragend', onDragEnd)
  // add search box to map
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  })
  map.addControl(geocoder)
  // map.on('load', () => {
  //   geocoder.query('Boston')
  // })
}

render () {
  const { lng, lat, address } = this.state
  const { user, msgAlert } = this.props
  return (
    <div>
      <PlaygroundWelcome />
      <div className='row'>
        <div className='col-4'>
          <p className='lat-long' >
            Longitude: {lng}<br />
            Latitude: {lat}</p>
          <CreateLocation
            lng={lng}
            lat={lat}
            msgAlert={msgAlert}
            user={user}
            address={address}
            setAddress={this.setAddress}
          />
        </div>
        <div className='col-8'>
          <div ref={this.mapContainer} className='map-container'>
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default Map
