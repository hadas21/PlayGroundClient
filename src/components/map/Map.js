import React, { Component } from 'react'
//, { useRef, useEffect, useState }
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './../../index.scss'
import { saveLocation } from '../../api/map'
import CreateLocation from '../../components/location/CreateLocation'
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute'

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

address = null

componentDidMount () {
  const { lng, lat, zoom } = this.state
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds',
    center: [lng, lat],
    zoom: zoom
  })
  map.on('click', (e) => {
    this.setState({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      zoom: map.getZoom().toFixed(2)
    })

    saveLocation(this.state.lng, this.state.lat)
      .then((res) => {
        console.log(res.data)
        this.address = res.data.features[1].place_name
      }
      )
      .catch((err) => console.log(err))
    const marker = new mapboxgl.Marker()
      .setLngLat({ lng: this.state.lng, lat: this.state.lat })
      .addTo(map) // add the marker to the map
    console.log('this is marker: ', marker)
  }
  )
  console.log(map)
}

render () {
  const { lng, lat, zoom } = this.state
  const { user } = this.props
  return (
    <div>
      <div className='sidebar'>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={this.mapContainer} className='map-container' />
      <AuthenticatedRoute
        user={user}
        path='/create-location'
        render={() => <CreateLocation user={user} address={this.address}/>}
      />
      <CreateLocation />
    </div>
  )
}
}

export default Map
