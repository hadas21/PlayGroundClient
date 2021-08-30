
import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { indexAllLocations } from '../../api/location'

// This will be our Books Index component (show all books)
class IndexAllLocations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      locations: []
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the books
    indexAllLocations()
      .then((res) => {
        console.log(typeof res.data.locations)
        const response = res.data.locations.map(
          (location) => location.location)
        this.setState({ locations: response })
        console.log(response)
      })
      .catch(console.error)
  }

  render () {
    const { locations } = this.state
    // locations.map((lo) => <li key={lo._id}>{lo}</li>)

    return (
      <>
        <h4>locations</h4>
        <ul>
          {locations.map((lo) => <li key={lo._id}>{lo}</li>)}
        </ul>
      </>
    )
  }
}

export default IndexAllLocations
