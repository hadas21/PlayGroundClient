import React, { Component } from 'react'
//, { useRef, useEffect, useState }
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './../../index.scss'
import { indexLocations } from '../../api/location'
import { saveLocation } from '../../api/map'
// import CreateLocation from '../../components/location/CreateLocation'
// import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute'
import Sidebar from './Sidebar'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lng: '',
      lat: '',
      zoom: ''
    }
    this.mapContainer = React.createRef()
  }

address = ''

componentDidMount () {
  // const { zoom } = this.state
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds',
    center: [-13, 34],
    zoom: 2
  })

  indexLocations(this.props.user)
  // .then((res) => console.log(res))
    .then((res) => {
      for (const { coordinates } of res.data.locations) {
        // make a marker for each feature and add to the map
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
      }
    })
    .catch((err) => console.log(err))
  // map.dragRotate.enable()

  // On click function
  map.on('load', () => {
    // console.log(e)
    // this.setState({
    //   lng: e.lngLat.lng,
    //   lat: e.lngLat.lat,
    //   zoom: map.getZoom().toFixed(2)
    // })

    saveLocation(this.state.lng, this.state.lat)
      .then((res) => {
        console.log(res.data)
        this.address = res.data.features[1].place_name
        console.log('This is this.address 1', this.address)
      })
      .catch((err) => console.log(err))

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat({ lng: this.state.lng, lat: this.state.lat })
      .addTo(map)
    console.log('this is marker: ', marker)
    function onDragEnd (e) {
      console.log(e)
      // this.setState({
      //   lng: e.lngLat.lng,
      //   lat: e.lngLat.lat,
      //   zoom: map.getZoom().toFixed(2)
      // })
      // const lngLat = marker.getLngLat()
      // coordinates.style.display = 'block'
      // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`
    }

    marker.on('dragend', onDragEnd)
  })

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken

  })
  map.addControl(geocoder)
}

render () {
  const { lng, lat, zoom } = this.state
  const { user, msgAlert } = this.props
  return (
    <div>
      <Sidebar>
        lng={lng}
        lat={lat}
        msgAlert={msgAlert}
        user={user}
        address={this.address}
        map={this.map}
      </Sidebar>
      <div ref={this.mapContainer} className='map-container' />
      <div className='lat-long'>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      This is address: {this.address}
      </div>
    </div>
  )
}
}

export default Map
