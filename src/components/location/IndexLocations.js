import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexLocations } from '../../api/location'

class IndexLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locations: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    indexLocations(user)
      .then(res => this.setState({ locations: res.data.locations }))
      .catch(err => console.log(err))
      // .then(() => msgAlert({ heading: 'Index success', message: 'Here are the locations', variant: 'success' }))
      // .catch(err => msgAlert({ heading: 'Index failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
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
        <h3>All The Movies:</h3>
        {locationJsx}
      </>
    )
  }
}

export default IndexLocations
