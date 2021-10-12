import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './../../index.scss'
import { indexLocations } from '../../api/location'
import { getAddress } from '../../api/map'
import CreateLocation from '../location/CreateLocation'
import PlaygroundWelcome from './PlaygroundWelcome'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

function Map (props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState('')
  const [lat, setLat] = useState('')
  const [setZoom] = useState('')
  const [address, setAddress] = useState('')
  // const [color] = useState('#ffff')
  // const [center, setCenter] = useState('')

  // display map
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/lauraalyson/ckuj0d93d323s17rwaujvd8go',
      center: [-29, 32],
      zoom: 2
    })
  })
  // display markers to show saved locations
  useEffect(() => {
    indexLocations(props.user)
      .then((res) => {
        console.log('This is the response\n', res.data.locations)

        for (const { coordinates, location, description } of res.data
          .locations) {
          new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <div>
                <h4>${location}</h4>
                <h6>${description}</h6>
                </div>
                `
              )
            )
            .addTo(map.current)
        }
      })
      .catch((error) => console.log(error))
  })

  useEffect(() => {
    // drop new marker on map to select and create new location
    const marker = new mapboxgl.Marker({ color: '#ffff', draggable: true })
      .setLngLat([map.getCenter().lng, map.getCenter().lat]) // map.getCenter().lat.toFixed(4)
      .addTo(map)
    // store data of marked location
    const onDragEnd = (e) => {
      // set state to marker coords
      const lngLat = marker.getLngLat()
      setLng(lngLat.lng)
      setLat(lngLat.lat)
      setZoom(map.getZoom().toFixed(2))

      getAddress(lngLat.lng, lngLat.lat)
        .then((res) => {
          console.log(res.data)
          this.setState({ address: res.data.features[1].text })
        })
        .catch((res) =>
          this.setState({
            address: 'Ooops, that is the ocean! Pick somewhere on land.'
          })
        )
    }

    marker.on('dragend', onDragEnd)
  })

  // empty address input after creating location
  function emptyAddress () {
    setAddress('')
  }

  return (
    <div>
      <PlaygroundWelcome />
      <div className='row'>
        <div className='col-lg-4 col-md-4 mb-sm-0 gutter-form'>
          <CreateLocation
            lng={lng}
            lat={lat}
            msgAlert={props.msgAlert}
            user={props.user}
            address={address}
            emptyAddress={emptyAddress}
          />
          {/* <div><p>{locations}</p></div> */}
        </div>
        <div className='col-lg-8 col-md-8 mb-sm-0'>
          <div ref={mapContainer} className='map-container'></div>
        </div>
      </div>
    </div>
  )
}

// this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000)

// this.setState({ mapStore: map })

// const { color } = this.state

// get saved locations to display markers on map

// map.dragRotate.enable()

//   // drop new draggable marker to create new location
//
//   // keep only one draggable marker on map
//   map.on('moveend', () => {
//     marker.remove()

//     marker
//       .setLngLat([map.getCenter().lng, map.getCenter().lat]) // map.getCenter().lat.toFixed(4)
//       .addTo(map)
//   })

//   marker.on('click', (event) => {
//     console.log('this has been clicked \n', event)
//   })

//   const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
//   })
//   map.addControl(geocoder)
// }

// render () {
//   const { lng, lat, address } = this.state
//   const { user, msgAlert } = this.props

// }
// }

export default Map
