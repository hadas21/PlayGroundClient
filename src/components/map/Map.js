import React, { Component } from 'react'
//, { useRef, useEffect, useState }
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './../../index.scss'
import { indexLocations } from '../../api/location'
import { getAddress } from '../../api/map'
// import CreateLocation from '../../components/location/CreateLocation'
// import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute'
import Sidebar from './Sidebar'
import Users from './../Users'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lng: '',
      lat: '',
      zoom: '',
      address: '',
      color: ''
    }
    this.mapContainer = React.createRef()
  }

setMarkerColor = () => {
  this.setState({ color: '#33dc3f' })
}

componentDidMount () {
  // const { zoom } = this.state
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds',
    center: [-13, 34],
    zoom: 2
  })

  const { color } = this.state
  indexLocations(this.props.user)
    .then((res) => {
      console.log(res)
      for (const { coordinates, location, description } of res.data.locations) {
        // make a marker for each location and add to the map
        new mapboxgl.Marker({ draggable: false, color: '#ffff' })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h6>${location}</h6><p>${description}</p>`
            )
          )
          .addTo(map)
      }
    })
    .catch((err) => console.log(err))
  // map.dragRotate.enable()

  // On click function
  map.on('load', () => {
    // drop a marker to create new location
    const marker = new mapboxgl.Marker({ color: color, draggable: true })
      .setLngLat([0, 0])
      .addTo(map)
    console.log('this is marker: ', marker)

    marker.on('click', (e) => {
      console.log('this is marker.on click e: ', e)
    })

    const onDragEnd = (e) => {
      console.log('e: ', e)
      // set state to marker coords
      const lngLat = marker.getLngLat()
      this.setState({
        lng: lngLat.lng,
        lat: lngLat.lat,
        zoom: map.getZoom().toFixed(2),
        color: '#33dc3f'
      })
      // transfer coords to string address
      getAddress(lngLat.lng, lngLat.lat)
        .then((res) => {
          console.log(res.data)
          this.setState({ address: res.data.features[1].place_name })
        })
        .catch((err) => console.log(err))

      indexLocations(this.props.user)
        .then((res) => {
          console.log(res)
          for (const { coordinates, location, description } of res.data.locations) {
            new mapboxgl.Marker({ draggable: false, color: '#ffff' })
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${location}</h6><p>${description}</p>`)
              )
              .setLngLat(coordinates)
              .addTo(map)
          }
        })
        .catch((err) => console.log(err))
    }

    marker.on('dragend', onDragEnd)
  })

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  })
  map.addControl(geocoder)

  map.on('click', (e) => {
    console.log('this is map.e ', e)
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
        setMarkerColor={this.setMarkerColor}
      />
      <div ref={this.mapContainer} className='map-container' />
      <Users />
      <div className='lat-long'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} address: {address}
      </div>
    </div>
  )
}
}

export default Map
