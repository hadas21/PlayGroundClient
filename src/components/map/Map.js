import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './../../index.scss'
import { indexLocations } from '../../api/location'
import { onDragEnd, centerDraggableMarker } from '../../functions'
import CreateLocation from '../location/CreateLocation'
import PlaygroundWelcome from './PlaygroundWelcome'

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1cmFhbHlzb24iLCJhIjoiY2tzcDJleWVkMDF0NjMxcGhwMzM1Mm1tMiJ9.27PwqNrg2-gZnMmuS1vOww'

function Map (props) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState('')
  const [lat, setLat] = useState('')
  // const [setZoom] = useState('')
  const [address, setAddress] = useState('')
  // const [color] = useState('#ffff')
  const [created, setCreated] = useState(true)

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
    if (map.current._markers.length !== 0) {
      map.current._markers = []
    }
    indexLocations(props.user)
      .then((res) => {
        for (const { coordinates, location, description, _id } of res.data
          .locations) {
          const marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `
                <div data-id="${_id}">
                <h4>${location}</h4>
                <h6>${description}</h6>
                </div>
                `
              )
            )
            .addTo(map.current)

          console.log(marker.getPopup())

        }
      })
      .catch((error) => console.log(error))
  }, [created])

  // drop new marker on map to select and create a new location
  useEffect(() => {
    const draggableMarker = new mapboxgl.Marker({
      color: '#ffff',
      draggable: true
    })
      .setLngLat([map.current.getCenter().lng, map.current.getCenter().lat])
      .addTo(map.current)

    // store data of marked location
    draggableMarker.on('dragend', () =>
      onDragEnd(draggableMarker, setLng, setLat, setAddress)
    )
    // keep draggable marker on center of map
    map.current.on('moveend', () =>
      centerDraggableMarker(map.current, draggableMarker)
    )

    // add geoceder to search locations
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: 'Find your favorite location'
    })
    map.current.addControl(geocoder)
    console.log(map)
    geocoder.on('result', (e) => {
      // console.log(e.result.place_name)
      setAddress(e.result.place_name)
    })
  }, [])

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
            setCreated={setCreated}
            created={created}
          />
        </div>
        <div className='col-lg-8 col-md-8 mb-sm-0'>
          <div ref={mapContainer} className='map-container'></div>
        </div>
      </div>
    </div>
  )
}

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

// render () {
//   const { lng, lat, address } = this.state
//   const { user, msgAlert } = this.props

// }
// }

export default Map
