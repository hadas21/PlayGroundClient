import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexLocations } from '../../api/location'
import { showLocationFailure } from '../AutoDismissAlert/messages'

class IndexLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locations: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexLocations(user)
      .then(res => this.setState({ locations: res.data.locations }))
      .catch((err) =>
        msgAlert({
          heading: 'Index failed :(',
          message: showLocationFailure + err.message,
          variant: 'danger'
        })
      )
  }

  // - render - display the movies in the state (optionally: loading message)
  render () {
    const { locations } = this.state
    if (locations === null) {
      return 'Loading...'
    }

    let locationJsx
    if (locations.length === 0) {
      locationJsx = 'No locations, go create some'
    } else {
      locationJsx = locations.map(location => (
        <li key={location._id}>
          <Link to={`/locations/${location._id}`}>{location.location}</Link>
        </li>
      ))
    }

    return (
      <>
        <h3>All The Locations:</h3>
        {locationJsx}
      </>
    )
  }
}

export default IndexLocations
