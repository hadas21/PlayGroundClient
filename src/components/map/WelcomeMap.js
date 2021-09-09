import React, { Component } from 'react'
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class WelcomeMap extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.mapContainer = React.createRef()
  }

  componentDidMount () {
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/lauraalyson/cksrla6wq2b4f18nvb4mmk0xv',
      center: [-70.9, 42.35],
      zoom: 2
    })
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })
    // // add search box to map
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken
    // })
    // map.addControl(geocoder)
    // // show boston on the map
    // map.on('load', () => {
    //   geocoder.query('')
    // })
  }

  render () {
    return (
      <div>
        <div ref={this.mapContainer} className='map-container' />
      </div>
    )
  }
}

export default WelcomeMap
