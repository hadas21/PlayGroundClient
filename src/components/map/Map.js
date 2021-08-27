import React, { Component } from 'react'
//, { useRef, useEffect, useState }
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import './../../index.scss'
import { saveLocation } from '../../api/map'
import CreateLocation from '../../components/location/CreateLocation'
import AuthenticatedRoute from '../../components/AuthenticatedRoute/AuthenticatedRoute'
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

  // geojson = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-77.032, 38.913]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'Washington, D.C.'
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-122.414, 37.776]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'San Francisco, California'
  //       }
  //     }
  //   ]
  // };

address = ''
myMap = this.map

componentDidMount () {
  // const { zoom } = this.state
  const map = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/lauraalyson/cksp2t5nr6w2m17o33s38ftds',
    center: [-13, 34],
    zoom: 2
  })

  map.on('click', (e) => {
    this.setState({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
      zoom: map.getZoom().toFixed(2)
    })
    console.log(map)

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
  for (const { geometry } of this.geojson.features) {
    // make a marker for each feature and add to the map
    new mapboxgl.Marker().setLngLat(geometry.coordinates).addTo(map)
  }
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
      <Sidebar />
      <div ref={this.mapContainer} className='map-container' />
      <div className='lat-long'>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <AuthenticatedRoute
        msgAlert={msgAlert}
        user={user}
        path='/map/create-location'
        render={() => (
          <CreateLocation
            msgAlert={msgAlert}
            user={user}
            address={this.address}
          />
        )}
      />
    </div>
  )
}
}

export default Map
