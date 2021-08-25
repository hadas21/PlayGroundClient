import React, { Component } from 'react'
//, { useRef, useEffect, useState }
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import './../../index.scss'
// import 'https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lng: 1.9,
      lat: 40.35,
      zoom: 1
    }
    this.mapContainer = React.createRef()
  }

  componentDidMount () {
    const { lng, lat, zoom } = this.state
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds',
      center: [lng, lat],
      zoom: zoom
    })
    console.log(map)
  }

  render () {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    )
  }
}

export default Map
